/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NovaPoshtaAnonUserResponse } from './NovaPoshtaAnonUserResponse';
import type { OrderedProductResponse } from './OrderedProductResponse';
import type { OrdersStatuses } from './OrdersStatuses';
import type { PaymentsType } from './PaymentsType';
import type { PostsType } from './PostsType';
import type { UserResponseForOrder } from './UserResponseForOrder';
export type OrderAnonymUserResponse = {
    id: number;
    price_order: number;
    user_id?: number;
    user?: UserResponseForOrder;
    basket_id?: number;
    first_name_anon_user: string;
    last_name_anon_user: string;
    email_anon_user: string;
    phone_number_anon_user?: string;
    is_another_recipient?: boolean;
    full_name_another_recipient?: string;
    phone_number_another_recipient?: string;
    post_type: PostsType;
    selected_nova_poshta_id?: number;
    selected_nova_poshta?: NovaPoshtaAnonUserResponse;
    country?: string;
    city?: string;
    area?: string;
    region?: string;
    street?: string;
    house_number?: string;
    apartment_number?: string;
    floor?: number;
    post_code?: string;
    payment_type: PaymentsType;
    created_at: string;
    confirmation_manager: boolean;
    confirmation_pay: boolean;
    call_manager: boolean;
    is_authenticated: boolean;
    status_order: OrdersStatuses;
    ordered_products?: Array<OrderedProductResponse>;
    comment?: string;
};

