'use server';

import prisma from '@/lib/db/prisma';
import { getUser } from '@/features/auth/actions/getUser';

export async function getUserProfile() {
  const user = await getUser();
  if (!user) throw new Error('Not authenticated');

  const profile = await prisma.userProfile.findUnique({
    where: { authUserId: user.id },
  });

  if (!profile) throw new Error('Profile not found');

  return profile;
}
