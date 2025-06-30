import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Project Starter',
  description:
    'The project starter for a PSSN (Prisma, Supabase, Shadcn, NextJS) stack',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center">
      {children}
    </div>
  );
}
