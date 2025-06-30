'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'; // your utility for conditional classes
import { LogoutButton } from '@/features/auth/components/LogoutButton';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Profile', href: '/dashboard/profile' },
    { label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <aside className="w-64 h-full bg-background border-r border-border flex flex-col">
      <div className="p-6 text-lg font-bold border-b border-border">
        YourApp
      </div>

      <nav className="flex-1 p-6 space-y-1">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
              pathname === href
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground',
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-border">
        <LogoutButton />
      </div>
    </aside>
  );
}
