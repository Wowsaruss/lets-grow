
export enum UserRole {
  User = "user",
  Admin = "admin"
}

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  username: string;
  role: UserRole;
  city: string;
  state: string;
  address1: string;
  address2?: string;
  zipcode: string;
  growingZoneId?: number;
  gardenTypeId: string;
  auth0Id?: string;
  passwordHash: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserBody {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  username: string;
  password: string;
  role: UserRole;
  city: string;
  state: string;
  address1: string;
  address2?: string;
  zipcode: string;
  growingZoneId?: number;
  gardenTypeId: string;
  auth0Id?: string;
}

export interface UpdateUserBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
  role?: UserRole;
  city?: string;
  state?: string;
  address1?: string;
  address2?: string;
  zipcode?: string;
  growingZoneId?: number;
  gardenTypeId?: string;
  auth0Id?: string;
  isActive?: boolean;
}