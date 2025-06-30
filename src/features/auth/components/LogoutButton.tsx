'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase/client';

export function LogoutButton() {
  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out!');
      window.location.href = '/login'; // force full reload
    } catch {
      toast.error('Logout failed');
    }
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
