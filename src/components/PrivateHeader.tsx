'use client';

import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background">
      <div className="text-lg font-semibold">Dashboard</div>
      {/* Add any user menu or notifications here */}
      <Button variant="ghost" size="sm">
        Settings
      </Button>
    </header>
  );
}
