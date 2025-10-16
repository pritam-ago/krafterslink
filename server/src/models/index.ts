export type UUID = string;

export interface User {
  id: UUID;
  email: string;
  passwordHash?: string;
  name?: string;
  createdAt?: string;
}

export interface Link {
  id: UUID;
  userId: UUID;
  originalUrl: string;
  shortCode: string;
  title?: string;
  clicks?: number;
  createdAt?: string;
}
