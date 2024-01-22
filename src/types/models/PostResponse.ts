/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NovaPoshtaDataResponse } from './NovaPoshtaDataResponse';
import type { UkrPoshtaResponse } from './UkrPoshtaResponse';
import type { UserResponseForCRM } from './UserResponseForCRM';
export type PostResponse = {
    id: number;
    user_id: number;
    user?: UserResponseForCRM;
    ukr_poshta?: Array<UkrPoshtaResponse>;
    nova_poshta?: Array<NovaPoshtaDataResponse>;
};

