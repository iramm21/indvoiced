'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogoutButton } from '@/features/auth/components/LogoutUserButton';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Clients', href: '/dashboard/clients' },
    { label: 'Invoices', href: '/dashboard/invoices' },
    { label: 'Settings', href: '/dashboard/account/settings' },
  ];

  return (
    <>
      {/* Backdrop - only on small screens when open */}
      <div
        className={cn(
          'fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible',
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-background border-r border-border flex flex-col z-50 transform transition-transform duration-300 ease-in-out shadow-lg',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:static md:flex',
        )}
      >
        {/* Logo / Branding */}
        <div className="px-6 py-5 text-2xl font-extrabold tracking-tight border-b border-border select-none">
          Indvoiced
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-accent/40 scrollbar-track-transparent">
          <div className="text-xs uppercase font-semibold text-muted-foreground px-2 mb-3 tracking-wider">
            Menu
          </div>
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'block rounded-md px-4 py-3 text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-accent text-accent-foreground shadow-md'
                  : 'text-muted-foreground hover:text-accent-foreground hover:bg-accent/30',
              )}
              onClick={onClose}
              tabIndex={hasMounted && !isOpen ? -1 : 0} // fixed hydration-safe check
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="flex justify-center w-full border-t py-4 bg-accent dark:bg-primary">
          <ThemeToggle />
        </div>
        <div className="px-6 py-4 border-t border-border flex flex-col items-center gap-4">
          <LogoutButton className="w-full max-w-[180px]" />
        </div>
      </aside>
    </>
  );
}
