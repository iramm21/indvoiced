// features/invoice/actions/createInvoice.ts
'use server';

import prisma from '@/lib/db/prisma';
import { getUser } from '@/features/auth/actions/getUser';

interface LineItemInput {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface CreateInvoiceInput {
  title: string;
  issueDate: Date;
  dueDate: Date;
  notes?: string;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE';
  clientIds: string[]; // selected client IDs
  lineItems: LineItemInput[];
}

export async function createInvoice(data: CreateInvoiceInput) {
  const user = await getUser();
  if (!user) throw new Error('Not authenticated');

  const userProfile = await prisma.userProfile.findUnique({
    where: { authUserId: user.id },
  });

  if (!userProfile) throw new Error('User profile not found');

  const subtotal = data.lineItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const tax = subtotal * 0.1; // Example 10% tax
  const total = subtotal + tax;

  const invoice = await prisma.invoice.create({
    data: {
      userId: userProfile.id,
      title: data.title,
      issueDate: data.issueDate,
      dueDate: data.dueDate,
      notes: data.notes,
      status: data.status,
      subtotal,
      tax,
      total,
      lineItems: {
        create: data.lineItems.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.unitPrice * item.quantity,
        })),
      },
      clients: {
        create: data.clientIds.map((clientId) => ({
          client: { connect: { id: clientId } },
        })),
      },
    },
  });

  return invoice;
}
