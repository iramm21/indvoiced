// features/clients/actions/createClient.ts
'use server';

import prisma from '@/lib/db/prisma';
import { z } from 'zod';

const clientSchema = z.object({
  userId: z.string(),
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export async function createClient(data: z.infer<typeof clientSchema>) {
  const validated = clientSchema.safeParse(data);
  if (!validated.success) {
    throw new Error('Invalid client data');
  }

  return prisma.client.create({
    data: validated.data,
  });
}
