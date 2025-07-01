'use server';

import { createSupabaseServerClient } from '@/lib/db/supabase/server';

export async function logout() {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
