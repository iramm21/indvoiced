'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateClient } from '../actions/updateClient';
import { Client, ClientFormFields } from '@/types/clients';

interface EditClientDialogProps {
  client: Client;
  open: boolean;
  onClose: () => void;
  onSuccess: (updatedClient: Client) => void;
}

export function EditClientDialog({
  client,
  open,
  onClose,
  onSuccess,
}: EditClientDialogProps) {
  const [form, setForm] = useState<ClientFormFields>({
    name: client.name,
    email: client.email ?? '',
    phone: client.phone ?? '',
    address: client.address ?? '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      name: client.name,
      email: client.email ?? '',
      phone: client.phone ?? '',
      address: client.address ?? '',
    });
  }, [client]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name as keyof ClientFormFields]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setLoading(true);
    try {
      const updatedClient = await updateClient({
        id: client.id,
        ...form,
        email: form.email || undefined,
        phone: form.phone || undefined,
        address: form.address || undefined,
      });
      toast.success('Client updated');
      onSuccess(updatedClient);
      onClose();
    } catch {
      toast.error('Failed to update client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
          <DialogDescription>
            Update client information below and save your changes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {(Object.keys(form) as (keyof ClientFormFields)[]).map((field) => (
            <div key={field}>
              <Label htmlFor={field} className="capitalize">
                {field === 'name' ? 'Name *' : field}
              </Label>
              <Input
                id={field}
                name={field}
                type={field === 'email' ? 'email' : 'text'}
                value={form[field]}
                onChange={handleChange}
                required={field === 'name'}
                disabled={loading}
                autoFocus={field === 'name'}
              />
            </div>
          ))}
          <DialogFooter className="space-x-2">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button variant="ghost" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
