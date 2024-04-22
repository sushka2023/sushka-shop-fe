/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderedProductModel } from './OrderedProductModel';
import type { PaymentsTypes } from './PaymentsTypes';
import type { PostType } from './PostType';
export type OrderAnonymUserModel = {
    first_name_anon_user: string;
    last_name_anon_user: string;
    email_anon_user: string;
    phone_number_anon_user: string;
    is_another_recipient?: boolean;
    full_name_another_recipient?: string;
    phone_number_another_recipient?: string;
    post_type: PostType;
    country?: string;
    city: string;
    address_warehouse?: string;
    area?: string;
    region?: string;
    street?: string;
    house_number?: string;
    apartment_number?: string;
    floor?: number;
    post_code?: string;
    payment_type: PaymentsTypes;
    call_manager: boolean;
    ordered_products: Array<OrderedProductModel>;
    comment?: string;
};

