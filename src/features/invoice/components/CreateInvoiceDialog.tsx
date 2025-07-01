'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { createInvoice } from '@/features/invoice/actions/createInvoice';
import { getClients } from '@/features/clients/actions/getClients';
import type { Client } from '@prisma/client';

interface LineItemInput {
  description: string;
  quantity: number;
  unitPrice: number;
}

export function CreateInvoiceDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE'>(
    'DRAFT',
  );
  const [notes, setNotes] = useState('');
  const [lineItems, setLineItems] = useState<LineItemInput[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([]);

  useEffect(() => {
    async function loadClients() {
      try {
        const clientList = await getClients(); // ✅ uses server-side auth
        setClients(clientList);
      } catch (error) {
        toast.error('Failed to load clients');
        console.error(error);
      }
    }

    loadClients();
  }, []);

  const addLineItem = () => {
    setLineItems((prev) => [
      ...prev,
      { description: '', quantity: 1, unitPrice: 0 },
    ]);
  };

  const updateLineItem = (
    index: number,
    field: keyof LineItemInput,
    value: string,
  ) => {
    setLineItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]:
                field === 'quantity' || field === 'unitPrice'
                  ? Number(value)
                  : value,
            }
          : item,
      ),
    );
  };

  const handleSubmit = async () => {
    try {
      await createInvoice({
        title,
        issueDate: new Date(issueDate),
        dueDate: new Date(dueDate),
        status,
        notes,
        clientIds: selectedClientIds,
        lineItems,
      });
      toast.success('Invoice created!');
      setOpen(false);
    } catch (error) {
      toast.error('Failed to create invoice');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Invoice</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>New Invoice</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as typeof status)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="SENT">Sent</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="OVERDUE">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Issue Date</Label>
              <Input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Due Date</Label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Clients</Label>
            <div className="flex flex-wrap gap-2">
              {clients.map((client) => (
                <Button
                  key={client.id}
                  variant={
                    selectedClientIds.includes(client.id)
                      ? 'default'
                      : 'outline'
                  }
                  size="sm"
                  onClick={() => {
                    setSelectedClientIds((prev) =>
                      prev.includes(client.id)
                        ? prev.filter((id) => id !== client.id)
                        : [...prev, client.id],
                    );
                  }}
                >
                  {client.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label>Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Line Items</Label>
              <Button type="button" onClick={addLineItem} size="sm">
                Add Item
              </Button>
            </div>

            {lineItems.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <Input
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    updateLineItem(index, 'description', e.target.value)
                  }
                />
                <Input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    updateLineItem(index, 'quantity', e.target.value)
                  }
                />
                <Input
                  type="number"
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) =>
                    updateLineItem(index, 'unitPrice', e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSubmit}>Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
