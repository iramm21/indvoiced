// app/dashboard/page.tsx
import { createSupabaseServerClient } from '@/lib/db/supabase/server';
import prisma from '@/lib/db/prisma';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-muted-foreground">
        Please log in to see your dashboard.
      </div>
    );
  }

  const userProfile = await prisma.userProfile.findUnique({
    where: { authUserId: user.id },
  });

  if (!userProfile) {
    return (
      <div className="h-screen flex items-center justify-center text-muted-foreground">
        User profile not found.
      </div>
    );
  }

  const clientCount = await prisma.client.count({
    where: {
      userId: userProfile.id,
    },
  });

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {userProfile.firstName || userProfile.email}
          </h1>
          <p className="text-muted-foreground text-sm">
            Here&apos;s a quick summary of your business.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/invoices/new">+ New Invoice</Link>
        </Button>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Invoices" value="$12,420" />
        <DashboardCard title="Outstanding" value="$3,200" />
        <DashboardCard title="Paid" value="$9,220" />
        <DashboardCard title="Clients" value={clientCount.toString()} />
      </div>

      {/* Placeholder for Charts or Recent Activity */}
      <div className="bg-background border rounded-lg p-6 text-center text-muted-foreground">
        Chart or recent activity feed will go here.
      </div>
    </div>
  );
}

// Small dashboard stat card
function DashboardCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-background border rounded-lg p-5 shadow-sm">
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <h3 className="text-xl font-semibold">{value}</h3>
    </div>
  );
}
