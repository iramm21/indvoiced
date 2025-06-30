'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex items-center space-x-3">
      {isDark ? (
        <Moon className="w-5 h-5 transition-all rotate-0 scale-100 text-muted-foreground" />
      ) : (
        <Sun className="w-5 h-5 transition-all rotate-90 scale-100 text-muted-foreground" />
      )}
      <Switch
        id="dark-mode"
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      />
    </div>
  );
}
