// app/(private)/dashboard/clients/page.tsx
import { createSupabaseServerClient } from '@/lib/db/supabase/server';
import prisma from '@/lib/db/prisma';
import { ClientList } from '@/features/clients/components/ClientList';

export default async function ClientsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-lg text-muted-foreground">
        Please log in to manage your clients.
      </div>
    );
  }

  const userProfile = await prisma.userProfile.findUnique({
    where: { authUserId: user.id },
  });

  if (!userProfile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-lg text-muted-foreground">
        User profile not found.
      </div>
    );
  }

  return (
    <section className="px-6 py-10 max-w-6xl mx-auto space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <p className="text-muted-foreground">
          View, edit, or manage your client information.
        </p>
      </header>

      <ClientList userId={userProfile.id} />
    </section>
  );
}
