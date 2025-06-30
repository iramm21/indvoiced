// app/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong.</h1>
      <p className="mb-8">{error.message || 'An unexpected error occurred.'}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
