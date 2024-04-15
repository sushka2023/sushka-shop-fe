/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NovaPoshtaDataResponse } from './NovaPoshtaDataResponse';
import type { UkrPoshtaResponse } from './UkrPoshtaResponse';
export type PostResponseOrder = {
    id: number;
    user_id: number;
    ukr_poshta?: Array<UkrPoshtaResponse>;
    nova_poshta?: Array<NovaPoshtaDataResponse>;
};

