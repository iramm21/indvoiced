'use server';

import prisma from '@/lib/db/prisma';
import { getUser } from '@/features/auth/actions/getUser';
import { revalidatePath } from 'next/cache';

interface UpdateUserProfileProps {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  address?: string | null;
}

export async function updateUserProfile(
  data: UpdateUserProfileProps,
): Promise<void> {
  const user = await getUser();
  if (!user) throw new Error('Not authenticated');

  await prisma.userProfile.update({
    where: { authUserId: user.id },
    data: {
      email: data.email,
      firstName: data.firstName ?? null,
      lastName: data.lastName ?? null,
      phone: data.phone ?? null,
      address: data.address ?? null,
    },
  });

  revalidatePath('/dashboard/account/settings/profile');
}
