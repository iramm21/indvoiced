// features/invoice/actions/getInvoices.ts
'use server';

import prisma from '@/lib/db/prisma';
import { createSupabaseServerClient } from '@/lib/db/supabase/server';

export async function getInvoices() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return [];

  // Find user profile id for filtering invoices
  const userProfile = await prisma.userProfile.findUnique({
    where: { authUserId: user.id },
  });

  if (!userProfile) return [];

  const invoices = await prisma.invoice.findMany({
    where: { userId: userProfile.id },
    orderBy: { createdAt: 'desc' },
    include: {
      clients: {
        include: {
          client: true,
        },
      },
      lineItems: true,
    },
  });

  return invoices;
}
