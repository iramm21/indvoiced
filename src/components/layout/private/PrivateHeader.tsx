'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/db/supabase/client';
import { User } from '@supabase/auth-js';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/features/auth/components/LogoutUserButton';
import { formatPageTitle } from '@/lib/utils';
import { ChevronDown, Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data, error } = await supabase
          .from('UserProfile') // adjust case if needed for your table name
          .select('firstName')
          .eq('authUserId', currentUser.id)
          .single();

        if (!error && data?.firstName) {
          setFirstName(data.firstName);
        }
      }
    };

    fetchSession();
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background">
      {/* Hamburger for mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu className="w-6 h-6" />
      </Button>

      <div className="text-lg font-bold tracking-tight flex-1 text-center md:text-left">
        {formatPageTitle(pathname)}
      </div>

      {user && (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              {firstName ?? 'Account'}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  menuOpen ? 'rotate-180' : ''
                }`}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={6}>
            <DropdownMenuItem asChild>
              <a href="/dashboard/account/settings">Account Settings</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
