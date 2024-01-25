/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderStatus } from './OrderStatus';
import type { PaymentTypes } from './PaymentTypes';
export type OrderResponse = {
    id: number;
    user_id: number;
    basket_id: number;
    price_order: number;
    payment_type: PaymentTypes;
    created_at: string;
    confirmation_manager: boolean;
    confirmation_pay: boolean;
    call_manager: boolean;
    status_order: OrderStatus;
};

