'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  ShieldCheck,
  LayoutPanelLeft,
  Terminal,
  Database,
  Layers3,
  Rocket,
} from 'lucide-react';

import { NextjsLogo } from '@/components/icons/NextjsLogo';
import { PrismaLogo } from '@/components/icons/PrismaLogo';
import { SupabaseLogo } from '@/components/icons/SupabaseLogo';
import { TailwindLogo } from '@/components/icons/TailwindLogo';
import { ShadcnLogo } from '@/components/icons/ShadcnLogo';

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero */}
      <section className="max-w-5xl mx-auto text-center pt-20 space-y-6 px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          Project Starter Kit
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          A production-ready starter built with Prisma, Supabase, Shadcn UI, and
          Next.js.
        </p>
        <Button
          onClick={() => toast.success('This is a working toast! 🎉')}
          variant="default"
          className="mt-4"
        >
          Show Toast
        </Button>
      </section>

      {/* Tech Stack */}
      <section className="max-w-5xl mx-auto text-center space-y-4 px-4">
        <h2 className="text-2xl font-semibold">Powered by:</h2>
        <div className="flex flex-wrap justify-center gap-6 items-center text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <NextjsLogo className="w-5 h-5 text-foreground" />
            <span>Next.js</span>
          </div>
          <div className="flex items-center gap-2">
            <PrismaLogo className="w-5 h-5 text-foreground" />
            <span>Prisma</span>
          </div>
          <div className="flex items-center gap-2">
            <SupabaseLogo className="w-5 h-5 text-foreground" />
            <span>Supabase</span>
          </div>
          <div className="flex items-center gap-2">
            <TailwindLogo className="w-5 h-5 text-foreground" />
            <span>Tailwind CSS</span>
          </div>
          <div className="flex items-center gap-2">
            <ShadcnLogo className="w-5 h-5 text-foreground" />
            <span>shadcn/ui</span>
          </div>
        </div>
      </section>

      <Separator className="max-w-2xl mx-auto" />

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">
              Authentication
            </CardTitle>
            <ShieldCheck className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Login and register with Supabase Auth — secure and extendable.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">
              UI Components
            </CardTitle>
            <LayoutPanelLeft className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Built with shadcn/ui and Tailwind for fast, beautiful interfaces.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">
              Backend Ready
            </CardTitle>
            <Terminal className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Includes Prisma setup, Supabase DB, and secure API structure.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Database</CardTitle>
            <Database className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Supabase + Prisma configured with row-level security and
              migrations.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">
              Stacked Architecture
            </CardTitle>
            <Layers3 className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Clean file structure with components, routes, utils, and API
              layers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">
              Launch Ready
            </CardTitle>
            <Rocket className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              ESLint, Prettier, env configs, and deploy setup included.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
