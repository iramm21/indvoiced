// features/auth/actions/login.ts
'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function loginWithEmailServer(email: string, password: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return {
    access_token: data.session?.access_token,
    refresh_token: data.session?.refresh_token,
  };
}
