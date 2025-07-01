// features/clients/actions/deleteClient.ts
'use server';

import prisma from '@/lib/db/prisma';

export async function deleteClient(clientId: string) {
  await prisma.client.delete({
    where: { id: clientId },
  });
}
