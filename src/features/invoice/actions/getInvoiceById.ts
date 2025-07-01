// features/invoice/actions/getInvoiceById.ts
'use server';

import { createSupabaseServerClient } from '@/lib/db/supabase/server';
import prisma from '@/lib/db/prisma';

export async function getInvoiceById(id: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const userProfile = await prisma.userProfile.findUnique({
    where: { authUserId: user.id },
  });

  if (!userProfile) return null;

  const invoice = await prisma.invoice.findFirst({
    where: {
      id,
      userId: userProfile.id,
    },
    include: {
      clients: {
        include: {
          client: true,
        },
      },
      lineItems: true,
    },
  });

  return invoice;
}
