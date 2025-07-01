import { notFound } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/db/supabase/server';
import prisma from '@/lib/db/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ClientPageProps {
  params: { id: string };
}

export default async function ClientPage({ params }: ClientPageProps) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return notFound();

  const userProfile = await prisma.userProfile.findUnique({
    where: { authUserId: user.id },
  });

  if (!userProfile) return notFound();

  const client = await prisma.client.findUnique({
    where: {
      id: params.id,
      userId: userProfile.id,
    },
  });

  if (!client) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Client Details</h1>
          <p className="text-muted-foreground text-sm">
            View detailed information about this client.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/clients">Back to Clients</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback>
              {client.name.charAt(0).toUpperCase() || <User />}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl">{client.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          {client.email && (
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> {client.email}
            </p>
          )}
          {client.phone && (
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> {client.phone}
            </p>
          )}
          {client.address && (
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {client.address}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
