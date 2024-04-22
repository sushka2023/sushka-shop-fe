/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NovaPoshtaDataResponse } from './NovaPoshtaDataResponse';
import type { UkrPoshtaResponse } from './UkrPoshtaResponse';
import type { UserResponseForOrder } from './UserResponseForOrder';
export type PostResponse = {
    id: number;
    user_id: number;
    user?: UserResponseForOrder;
    ukr_poshta?: Array<UkrPoshtaResponse>;
    nova_poshta?: Array<NovaPoshtaDataResponse>;
};

