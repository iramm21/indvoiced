'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteInvoice } from '@/features/invoice/actions/deleteInvoice';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';

interface Props {
  invoiceId: string;
}

export function DeleteInvoiceButton({ invoiceId }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    const confirmed = confirm('Are you sure you want to delete this invoice?');
    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteInvoice(invoiceId);
        toast.success('Invoice deleted');
        router.push('/dashboard/invoices');
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Failed to delete invoice';
        toast.error(message);
      }
    });
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
      className="cursor-pointer"
      size="icon"
    >
      {isPending ? 'Deleting...' : <Trash />}
    </Button>
  );
}
