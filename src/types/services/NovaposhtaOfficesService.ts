/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NovaPoshtaAddressDeliveryPartialUpdate } from '../models/NovaPoshtaAddressDeliveryPartialUpdate';
import type { NovaPoshtaAddressDeliveryResponse } from '../models/NovaPoshtaAddressDeliveryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NovaposhtaOfficesService {
    /**
     * Update Nova Poshta Data
     * Change the novaposhta data
     *
     * Arguments:
     * nova_poshta_id: int
     * nova_poshta_data: NovaPoshtaAddressDeliveryPartialUpdate: object with updated novaposhta data
     * db (Session): SQLAlchemy session object for accessing the database
     *
     * Returns:
     * NovaPoshta: object after the change operation
     * @param novaPoshtaId
     * @param requestBody
     * @returns NovaPoshtaAddressDeliveryResponse Successful Response
     * @throws ApiError
     */
    public static updateNovaPoshtaDataApiNovaPoshtaNovaPoshtaIdPartialUpdatePatch(
        novaPoshtaId: number,
        requestBody: NovaPoshtaAddressDeliveryPartialUpdate,
    ): CancelablePromise<NovaPoshtaAddressDeliveryResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/nova_poshta/{nova_poshta_id}/partial-update',
            path: {
                'nova_poshta_id': novaPoshtaId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
