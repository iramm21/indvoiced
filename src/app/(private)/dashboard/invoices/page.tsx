import { getInvoices } from '@/features/invoice/actions/getInvoices';
import { CreateInvoiceDialog } from '@/features/invoice/components/CreateInvoiceDialog';
import { DeleteInvoiceButton } from '@/features/invoice/components/DeleteInvoiceButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold border-b pb-4 mb-6">Invoices</h1>

      <div className="mb-8">
        <CreateInvoiceDialog />
      </div>

      {invoices.length === 0 ? (
        <p className="text-center text-muted-foreground">No invoices found.</p>
      ) : (
        <ul className="space-y-4">
          {invoices.map((invoice) => (
            <li
              key={invoice.id}
              className="rounded-md border border-border bg-card p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                {/* Left Side: Invoice Info */}
                <div className="flex-1 space-y-1">
                  <h2 className="text-xl font-semibold">{invoice.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    Status:{' '}
                    <span className="capitalize">
                      {invoice.status.toLowerCase()}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground max-w-md truncate">
                    Clients:{' '}
                    {invoice.clients.map((c) => c.client.name).join(', ')}
                  </p>
                </div>

                {/* Right Side: Amount + Actions */}
                <div className="flex flex-col items-end gap-2 min-w-[160px]">
                  <div className="text-right">
                    <p className="font-mono text-lg font-semibold text-foreground">
                      ${invoice.total.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="lg">
                      <Link href={`/dashboard/invoices/${invoice.id}`}>
                        View
                      </Link>
                    </Button>
                    <DeleteInvoiceButton invoiceId={invoice.id} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
