import type { UserRole } from './enum';

export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
    avatar_url?: string | null;
    email_verified_at: string | null;
    role: UserRole;
    date_of_birth?: string | null;
    is_banned?: boolean;
    created_at: string;
    updated_at: string;
};

export type Auth = {
    user: User;
};
