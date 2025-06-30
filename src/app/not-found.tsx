// app/not-found.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <p className="text-lg mb-8">
        Sorry, the page you&apos;re looking for does not exist.
      </p>
      <Link href="/">
        <Button>Go back home</Button>
      </Link>
    </div>
  );
}
