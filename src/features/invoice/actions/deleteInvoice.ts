'use server';

import { createSupabaseServerClient } from '@/lib/db/supabase/server';
import prisma from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteInvoice(id: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const userProfile = await prisma.userProfile.findUnique({
    where: { authUserId: user.id },
  });

  if (!userProfile) {
    throw new Error('Unauthorized');
  }

  const invoice = await prisma.invoice.findFirst({
    where: {
      id,
      userId: userProfile.id,
    },
  });

  if (!invoice) {
    throw new Error('Invoice not found or access denied.');
  }

  await prisma.invoice.delete({ where: { id } });

  // Refresh UI (optional)
  revalidatePath('/dashboard/invoices');
}
