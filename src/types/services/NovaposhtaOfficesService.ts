/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NovaPoshtaAddressDeliveryPartialUpdate } from '../models/NovaPoshtaAddressDeliveryPartialUpdate';
import type { NovaPoshtaAddressDeliveryResponse } from '../models/NovaPoshtaAddressDeliveryResponse';
import type { NovaPoshtaMessageResponse } from '../models/NovaPoshtaMessageResponse';
import type { NovaPoshtaWarehouseResponse } from '../models/NovaPoshtaWarehouseResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NovaposhtaOfficesService {
    /**
     * Get Branches Route
     * Obtain the novaposhta data from API Nova Poshta and add received branches to database
     *
     * Arguments:
     * settle_ref: str: parameter to receive all branches for the specific data
     * (the reference of the specific city)
     * search_term: str: search parameter
     * db (Session): SQLAlchemy session object for accessing the database
     *
     * Returns:
     * List of all branches for the specific city
     * @param settleRef
     * @param searchTerm
     * @returns NovaPoshtaWarehouseResponse Successful Response
     * @throws ApiError
     */
    public static getBranchesRouteApiNovaPoshtaWarehousesBranchesGet(
        settleRef: string,
        searchTerm?: string,
    ): CancelablePromise<Array<NovaPoshtaWarehouseResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nova_poshta/warehouses/branches/',
            query: {
                'settle_ref': settleRef,
                'search_term': searchTerm,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Postomats Route
     * Obtain the novaposhta data from API Nova Poshta and add received postomats to database
     *
     * Arguments:
     * settle_ref: str: parameter to receive all postomats for the specific data
     * (the reference of the specific city)
     * search_term: str: search parameter
     * db (Session): SQLAlchemy session object for accessing the database
     *
     * Returns:
     * List of all postomats for the specific city
     * @param settleRef
     * @param searchTerm
     * @returns NovaPoshtaWarehouseResponse Successful Response
     * @throws ApiError
     */
    public static getPostomatsRouteApiNovaPoshtaWarehousesPostomatsGet(
        settleRef: string,
        searchTerm?: string,
    ): CancelablePromise<Array<NovaPoshtaWarehouseResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/nova_poshta/warehouses/postomats/',
            query: {
                'settle_ref': settleRef,
                'search_term': searchTerm,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Warehouses Data
     * Update the novaposhta data from API Nova Poshta in database
     *
     * Arguments:
     * db (Session): SQLAlchemy session object for accessing the database
     *
     * Returns:
     * Message about successfully updating novaposhta data
     * @returns NovaPoshtaMessageResponse Successful Response
     * @throws ApiError
     */
    public static updateWarehousesDataApiNovaPoshtaUpdateWarehousesPut(): CancelablePromise<NovaPoshtaMessageResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/nova_poshta/update_warehouses',
        });
    }
    /**
     * Remove Warehouses Data
     * Remove novaposhta data from database.
     *
     * Args:
     * db: Session: Access the database
     *
     * Returns:
     * None
     * @returns void
     * @throws ApiError
     */
    public static removeWarehousesDataApiNovaPoshtaDeleteWarehousesDelete(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/nova_poshta/delete_warehouses',
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
