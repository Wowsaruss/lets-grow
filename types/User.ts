export interface User {
  id: number;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  auth0_id?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
} 