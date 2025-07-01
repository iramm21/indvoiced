'use client';

import { useState } from 'react';
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
import { createClient } from '../actions/createClient';
import { Client, ClientFormFields } from '@/types/clients';

interface CreateClientDialogProps {
  userId: string;
  open: boolean;
  onClose: () => void;
  onSuccess: (newClient: Client) => void;
}

export function CreateClientDialog({
  userId,
  open,
  onClose,
  onSuccess,
}: CreateClientDialogProps) {
  const [form, setForm] = useState<ClientFormFields>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

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
      const newClient = await createClient({
        userId,
        ...form,
        email: form.email || undefined,
        phone: form.phone || undefined,
        address: form.address || undefined,
      });
      toast.success('Client created');
      onSuccess(newClient);
      onClose();
      setForm({ name: '', email: '', phone: '', address: '' });
    } catch {
      toast.error('Failed to create client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Client</DialogTitle>
          <DialogDescription>
            Fill in client info below and hit &quot;Create&quot;.
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
              {loading ? 'Saving...' : 'Create'}
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
