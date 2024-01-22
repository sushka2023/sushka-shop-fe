/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NovaPoshtaAddressDeliveryCreate } from '../models/NovaPoshtaAddressDeliveryCreate';
import type { NovaPoshtaAddressDeliveryPartialUpdate } from '../models/NovaPoshtaAddressDeliveryPartialUpdate';
import type { NovaPoshtaAddressDeliveryResponse } from '../models/NovaPoshtaAddressDeliveryResponse';
import type { NovaPoshtaCreate } from '../models/NovaPoshtaCreate';
import type { NovaPoshtaResponse } from '../models/NovaPoshtaResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NovaposhtaOfficesService {
    /**
     * Create Nova Poshta Address Delivery
     * The create function creates a new novaposhta with address delivery.
     *
     * Args:
     * nova_postal_address_delivery: NovaPoshtaAddressDeliveryCreate: Validate the request body
     * db: Session: Access the database
     *
     * Returns:
     * An novaposhta object
     * @param requestBody
     * @returns NovaPoshtaAddressDeliveryResponse Successful Response
     * @throws ApiError
     */
    public static createNovaPoshtaAddressDeliveryApiNovaPoshtaCreateAddressDeliveryPost(
        requestBody: NovaPoshtaAddressDeliveryCreate,
    ): CancelablePromise<NovaPoshtaAddressDeliveryResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/nova_poshta/create_address_delivery',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Nova Poshta Warehouse
     * The create function creates a new novaposhta warehouse.
     *
     * Args:
     * nova_postal_warehouse: NovaPoshtaCreate: Validate the request body
     * db: Session: Access the database
     *
     * Returns:
     * An novaposhta object
     * @param requestBody
     * @returns NovaPoshtaResponse Successful Response
     * @throws ApiError
     */
    public static createNovaPoshtaWarehouseApiNovaPoshtaCreateWarehousePost(
        requestBody: NovaPoshtaCreate,
    ): CancelablePromise<NovaPoshtaResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/nova_poshta/create_warehouse',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
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
