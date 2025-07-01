'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { getClients } from '../actions/getClients';
import { deleteClient } from '../actions/deleteClient';
import { Client } from '@/types/clients';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Plus, Mail, Phone, MapPin, User } from 'lucide-react';
import { EditClientDialog } from './EditClientDialog';
import { CreateClientDialog } from './CreateClientDialog';
import { DeleteClientDialog } from './DeleteClientDialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ClientListProps {
  userId: string;
}

export function ClientList({ userId }: ClientListProps) {
  return <ClientListInner userId={userId} />;
}

function ClientListInner({ userId }: ClientListProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [creating, setCreating] = useState(false);

  // States for delete confirmation dialog
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getClients(userId);
      setClients(data);
    } catch {
      toast.error('Failed to load clients');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Open the delete dialog for the selected client
  const handleDeleteClick = (client: Client) => {
    setClientToDelete(client);
  };

  // Confirm delete action
  const handleConfirmDelete = async () => {
    if (!clientToDelete) return;

    try {
      setDeleting(true);
      setDeletingId(clientToDelete.id);
      // Optimistic UI update
      setClients((prev) => prev.filter((c) => c.id !== clientToDelete.id));
      await deleteClient(clientToDelete.id);
      toast.success('Client deleted');
      setClientToDelete(null);
      setDeletingId(null);
    } catch {
      toast.error('Failed to delete client');
      await fetchClients();
      setDeletingId(null);
    } finally {
      setDeleting(false);
    }
  };

  // Cancel delete action
  const handleCancelDelete = () => {
    setClientToDelete(null);
  };

  const handleClientUpdate = (updated: Client) => {
    setClients((prev) =>
      prev.map((client) => (client.id === updated.id ? updated : client)),
    );
    setEditingClient(null);
    toast.success('Client updated');
  };

  const handleClientCreate = (newClient: Client) => {
    setClients((prev) => [newClient, ...prev]);
    setCreating(false);
    toast.success('Client created');
  };

  return (
    <section className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Your Clients</h2>
        <Button onClick={() => setCreating(true)} aria-label="Add New Client">
          <Plus className="w-4 h-4 mr-2" />
          Add New Client
        </Button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-md" />
          ))}
        </div>
      ) : clients.length === 0 ? (
        <p className="text-muted-foreground text-center">
          No clients found. Click &quot;Add New Client&quot; to get started.
        </p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <Card
              key={client.id}
              className="relative transition-shadow hover:shadow-md border border-border/60 group"
            >
              {/* Full card clickable link */}
              <Link
                href={`/dashboard/clients/${client.id}`}
                className="absolute inset-0 z-0"
                aria-label={`View ${client.name}`}
              />

              <CardHeader className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 overflow-hidden">
                  <Avatar className="h-12 w-12 mx-auto sm:mx-0 shrink-0">
                    <AvatarFallback>
                      {client.name?.charAt(0).toUpperCase() || <User />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left space-y-0.5 overflow-hidden">
                    <h3 className="text-base font-medium truncate">
                      {client.name}
                    </h3>
                    {client.email && (
                      <div className="flex items-center justify-center sm:justify-start text-muted-foreground text-xs">
                        <Mail className="w-3 h-3 mr-1.5" />
                        <span className="truncate">{client.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-1 justify-center sm:justify-end z-10">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setEditingClient(client);
                    }}
                    aria-label={`Edit ${client.name}`}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleDeleteClick(client);
                    }}
                    disabled={deletingId === client.id}
                    aria-label={`Delete ${client.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="text-sm text-muted-foreground space-y-1 pl-2 sm:pl-[3.25rem] pb-4 z-10 relative">
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
          ))}
        </div>
      )}

      {/* Modals */}
      {editingClient && (
        <EditClientDialog
          client={editingClient}
          open={true}
          onClose={() => setEditingClient(null)}
          onSuccess={handleClientUpdate}
        />
      )}
      {creating && (
        <CreateClientDialog
          userId={userId}
          open={true}
          onClose={() => setCreating(false)}
          onSuccess={handleClientCreate}
        />
      )}
      {clientToDelete && (
        <DeleteClientDialog
          open={!!clientToDelete}
          clientName={clientToDelete.name}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          loading={deleting}
        />
      )}
    </section>
  );
}
