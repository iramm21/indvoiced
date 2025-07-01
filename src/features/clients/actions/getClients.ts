// features/clients/actions/getClients.ts
'use server';

import prisma from '@/lib/db/prisma';

export async function getClients(userId: string) {
  return prisma.client.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}
