// features/clients/actions/getClients.ts
'use server';

import prisma from '@/lib/db/prisma';
import { getUser } from '@/features/auth/actions/getUser';

export async function getClients() {
  const user = await getUser();
  if (!user) return [];

  const userProfile = await prisma.userProfile.findUnique({
    where: { authUserId: user.id },
  });

  if (!userProfile) return [];

  return prisma.client.findMany({
    where: { userId: userProfile.id },
    orderBy: { createdAt: 'desc' },
  });
}
