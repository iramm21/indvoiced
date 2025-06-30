import prisma from '@/lib/prisma';
import { UserProfileCreateInput } from '@/types/userProfile';

export async function createUserProfile(data: UserProfileCreateInput) {
  return prisma.userProfile.create({ data });
}
