export interface Client {
  id: string;
  userId: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClientFormFields {
  name: string;
  email: string;
  phone: string;
  address: string;
}
