'use server';
import prisma from '@/lib/db/prisma'; // your server prisma client instance
import { Client } from '@/types/clients';

interface UpdateClientInput {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

export async function updateClient(data: UpdateClientInput): Promise<Client> {
  const updatedClient = await prisma.client.update({
    where: { id: data.id },
    data: {
      name: data.name,
      email: data.email ?? null,
      phone: data.phone ?? null,
      address: data.address ?? null,
    },
  });
  return updatedClient;
}
