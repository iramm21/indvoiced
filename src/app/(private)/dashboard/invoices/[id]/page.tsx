import { notFound } from 'next/navigation';
import { getInvoiceById } from '@/features/invoice/actions/getInvoiceById';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { DeleteInvoiceButton } from '@/features/invoice/components/DeleteInvoiceButton';

type RouteParams = Promise<{ id: string }>;
type PageProps = { params: RouteParams };

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { id } = await params;
  const invoice = await getInvoiceById(id);
  if (!invoice) return { title: 'Invoice Not Found' };

  return {
    title: invoice.title,
    description: `Details for invoice: ${invoice.title}`,
  };
}

export default async function InvoicePage({ params }: PageProps) {
  const { id } = await params;
  const invoice = await getInvoiceById(id);

  if (!invoice) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{invoice.title}</h1>
          <p className="text-sm text-muted-foreground">
            Status: <span className="font-semibold">{invoice.status}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Issue Date: {new Date(invoice.issueDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-muted-foreground">
            Due Date: {new Date(invoice.dueDate).toLocaleDateString()}
          </p>
          {invoice.notes && (
            <p className="mt-4 whitespace-pre-wrap">{invoice.notes}</p>
          )}
          <p className="mt-4 text-sm text-muted-foreground">
            Clients: {invoice.clients.map((c) => c.client.name).join(', ')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" asChild size="sm">
            <Link href="/dashboard/invoices">Back to Invoices</Link>
          </Button>
          <DeleteInvoiceButton invoiceId={invoice.id}/>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left text-sm border-collapse border border-border">
            <thead>
              <tr>
                <th className="border border-border px-3 py-2">Description</th>
                <th className="border border-border px-3 py-2">Quantity</th>
                <th className="border border-border px-3 py-2">Unit Price</th>
                <th className="border border-border px-3 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.lineItems.map((item) => (
                <tr key={item.id}>
                  <td className="border border-border px-3 py-2">
                    {item.description}
                  </td>
                  <td className="border border-border px-3 py-2">
                    {item.quantity}
                  </td>
                  <td className="border border-border px-3 py-2">
                    ${item.unitPrice.toFixed(2)}
                  </td>
                  <td className="border border-border px-3 py-2">
                    ${item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-8 text-right text-lg font-semibold">
        <div>Subtotal: ${invoice.subtotal.toFixed(2)}</div>
        <div>Tax: ${invoice.tax.toFixed(2)}</div>
        <div>Total: ${invoice.total.toFixed(2)}</div>
      </div>
    </div>
  );
}
