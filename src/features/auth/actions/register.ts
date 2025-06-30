'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createUserProfile } from '@/features/userProfile/actions/createUserProfile';
import { UserProfileCreateInput } from '@/types/userProfile';
import { RegisterUserData } from '@/types/auth'; // or wherever you define it

export async function registerWithEmail(data: RegisterUserData) {
  const supabase = await createSupabaseServerClient();

  const { email, password, ...userData } = data;

  // 1. Sign up user in Supabase Auth
  const { data: signUpData, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  if (!signUpData.user) {
    throw new Error('User data missing after sign up');
  }

  // 2. Create user profile in Prisma with authUserId
  const createData: UserProfileCreateInput = {
    email,
    authUserId: signUpData.user.id,
    ...userData,
  };

  await createUserProfile(createData);
}
