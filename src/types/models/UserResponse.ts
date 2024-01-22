/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Role } from './Role';
export type UserResponse = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: Role;
    created_at: string;
    updated_at?: string;
    refresh_token?: string;
    is_deleted: boolean;
    is_blocked: boolean;
    is_active: boolean;
};

