'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoutButton } from '@/features/auth/components/LogoutUserButton';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

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
          'fixed top-0 left-0 h-full w-64 bg-background border-r border-border flex flex-col z-50 transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:static md:flex',
        )}
      >
        {/* Logo / Branding */}
        <div className="px-6 py-4 text-xl font-extrabold tracking-tight border-b border-border">
          Indvoiced
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="text-xs uppercase font-semibold text-muted-foreground px-2 mb-2">
            Menu
          </div>
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-accent-foreground hover:bg-accent/50',
              )}
              onClick={onClose} // Close sidebar on link click (mobile)
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-border">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
