/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymentsTypes } from './PaymentsTypes';
export type OrderModel = {
    selected_nova_poshta_id?: number;
    selected_ukr_poshta_id?: number;
    payment_type: PaymentsTypes;
    call_manager: boolean;
    is_another_recipient?: boolean;
    full_name_another_recipient?: string;
    phone_number_another_recipient?: string;
    comment?: string;
};

