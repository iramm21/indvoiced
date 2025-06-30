import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Project Starter',
  description:
    'The project starter for a PSSN (Prisma, Supabase, Shadcn, NextJS) stack',
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground w-full">
      <Header />
      <main className="flex-grow w-full px-4 md:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
}
