import prisma from '@/lib/db/prisma';
import { UserProfileCreateInput } from '@/types/userProfile';

export async function createUserProfile(data: UserProfileCreateInput) {
  return prisma.userProfile.create({ data });
}
