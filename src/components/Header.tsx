'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { User, Session, AuthChangeEvent } from '@supabase/auth-js';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LogoutButton } from '@/features/auth/components/LogoutButton';

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // initial load
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setMounted(true);
    });

    // listen for changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);
      },
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  if (!mounted) return null;

  return (
    <header className="w-full border-b border-muted/20 bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold cursor-pointer">Your App Name</h1>
        </Link>
        <nav className="flex items-center gap-4">
          {!user ? (
            <>
              <Button asChild size="sm" variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/register">Register</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
