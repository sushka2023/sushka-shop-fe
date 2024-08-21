/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymentsType } from './PaymentsType';
export type OrderModel = {
    phone_number_current_user?: string;
    selected_nova_poshta_id?: number;
    selected_ukr_poshta_id?: number;
    payment_type: PaymentsType;
    call_manager: boolean;
    is_another_recipient?: boolean;
    full_name_another_recipient?: string;
    phone_number_another_recipient?: string;
    comment?: string;
};

