export interface CreateUserBody {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    username?: string;
    role?: string;
    city?: string;
    state?: string;
    address1?: string;
    address2?: string;
    zipcode?: string;
    password: string;
    growingZoneId?: number;
    gardenTypeId?: number;
    auth0Id?: string;
}

export interface UpdateUserBody {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    username?: string;
    role?: string;
    city?: string;
    state?: string;
    address1?: string;
    address2?: string;
    zipcode?: string;
    password?: string;
    growingZoneId?: number;
    gardenTypeId?: number;
    auth0Id?: string;
    isActive?: boolean;
} 