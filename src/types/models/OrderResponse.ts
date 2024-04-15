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
export type OrderResponse = {
    id: number;
    user_id: number;
    user: UserResponseForOrder;
    is_another_recipient?: boolean;
    full_name_another_recipient?: string;
    phone_number_another_recipient?: string;
    basket_id: number;
    price_order: number;
    payment_type: PaymentsTypes;
    created_at: string;
    confirmation_manager: boolean;
    confirmation_pay: boolean;
    call_manager: boolean;
    status_order: OrdersStatus;
    post_type: PostType;
    selected_nova_poshta_id?: number;
    selected_nova_poshta?: NovaPoshtaDataResponse;
    selected_ukr_poshta_id?: number;
    selected_ukr_poshta?: UkrPoshtaResponse;
    ordered_products?: Array<OrderedProductResponse>;
    comment?: string;
};

