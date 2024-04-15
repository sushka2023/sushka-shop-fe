/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PostResponseOrder } from './PostResponseOrder';
import type { Role } from './Role';
export type UserResponseForCRM = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: Role;
    phone_number?: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    is_blocked: boolean;
    is_active: boolean;
    posts: PostResponseOrder;
};

