'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { User } from '@supabase/auth-js';
import { FacebookIcon } from '@/components/icons/FacebookIcon';
import { InstagramIcon } from '@/components/icons/InstagramIcon';
import { XIcon } from '@/components/icons/XIcon';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Footer() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  function handleDashboardClick(e: React.MouseEvent) {
    if (!user) {
      e.preventDefault(); // prevent navigation
      toast.error('Please login to access the dashboard');
    }
  }

  function handleSettingsClick(e: React.MouseEvent) {
    if (!user) {
      e.preventDefault();
      toast.error('Please login to access settings');
    }
  }

  return (
    <footer className="w-full border-t border-muted/20 bg-background py-12 text-muted-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          {/* About */}
          <div>
            <h3 className="mb-4 font-semibold text-lg text-primary">About</h3>
            <p className="text-sm max-w-xs mx-auto md:mx-0">
              Indvoiced is a modern invoicing platform designed for
              freelancers and small businesses to simplify payments, manage
              clients, and grow efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-lg text-primary">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="hover:text-primary transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 font-semibold text-lg text-primary">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/login"
                  className="hover:text-primary transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-primary transition-colors"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href={user ? '/dashboard' : '#'}
                  onClick={handleDashboardClick}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium cursor-pointer"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href={user ? '/settings' : '#'}
                  onClick={handleSettingsClick}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium cursor-pointer"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials + Theme Toggle */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 font-semibold text-lg text-primary">
              Connect with us
            </h3>
            <div className="flex space-x-6 mb-6">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-primary transition-colors"
              >
                <FacebookIcon className="h-6 w-6" />
              </Link>
              <Link
                href="https://X.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="hover:text-primary transition-colors"
              >
                <XIcon className="h-6 w-6" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-primary transition-colors"
              >
                <InstagramIcon className="h-6 w-6" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-primary transition-colors"
              >
                <LinkedInIcon className="h-6 w-6" />
              </Link>
            </div>

            <ThemeToggle />

            <p className="mt-auto pt-6 text-xs text-muted-foreground text-center md:text-left w-full">
              © {new Date().getFullYear()} Your App Name. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
