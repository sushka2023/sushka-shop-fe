/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NovaPoshtaDataResponse } from './NovaPoshtaDataResponse';
import type { OrderedProductResponse } from './OrderedProductResponse';
import type { OrdersStatus } from './OrdersStatus';
import type { PaymentsTypes } from './PaymentsTypes';
import type { PostType } from './PostType';
import type { UkrPoshtaResponse } from './UkrPoshtaResponse';
import type { UserResponseForOrder } from './UserResponseForOrder';
export type OrdersCRMResponse = {
    id: number;
    price_order: number;
    user_id?: number;
    user?: UserResponseForOrder;
    basket_id?: number;
    first_name_anon_user?: string;
    last_name_anon_user?: string;
    email_anon_user?: string;
    phone_number_anon_user?: string;
    is_another_recipient?: boolean;
    full_name_another_recipient?: string;
    phone_number_another_recipient?: string;
    post_type: PostType;
    country?: string;
    city?: string;
    address_warehouse?: string;
    area?: string;
    region?: string;
    street?: string;
    house_number?: string;
    apartment_number?: string;
    floor?: number;
    post_code?: string;
    payment_type: PaymentsTypes;
    created_at: string;
    confirmation_manager: boolean;
    confirmation_pay: boolean;
    call_manager: boolean;
    is_authenticated: boolean;
    status_order: OrdersStatus;
    selected_nova_poshta_id?: number;
    selected_nova_poshta?: NovaPoshtaDataResponse;
    selected_ukr_poshta_id?: number;
    selected_ukr_poshta?: UkrPoshtaResponse;
    ordered_products?: Array<OrderedProductResponse>;
    comment?: string;
    notes_admin?: string;
};

