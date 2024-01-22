/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UkrPoshtaCreate } from '../models/UkrPoshtaCreate';
import type { UkrPoshtaPartialUpdate } from '../models/UkrPoshtaPartialUpdate';
import type { UkrPoshtaResponse } from '../models/UkrPoshtaResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UkrposhtaOfficesService {
    /**
     * Create Ukr Poshta Office
     * The create function creates a new ukrposhta office.
     *
     * Args:
     * ukr_postal_office: UkrPoshtaCreate: Validate the request body
     * db: Session: Access the database
     *
     * Returns:
     * An ukrposhta object
     * @param requestBody
     * @returns UkrPoshtaResponse Successful Response
     * @throws ApiError
     */
    public static createUkrPoshtaOfficeApiUkrPoshtaCreatePost(
        requestBody: UkrPoshtaCreate,
    ): CancelablePromise<UkrPoshtaResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ukr_poshta/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Ukr Poshta Data
     * Change the ukrposhta data
     *
     * Arguments:
     * ukr_poshta_id: int
     * ukr_poshta_data: UkrPoshtaForm: object with updated ukrposhta data
     * db (Session): SQLAlchemy session object for accessing the database
     *
     * Returns:
     * UkrPoshta: object after the change operation
     * @param ukrPoshtaId
     * @param requestBody
     * @returns UkrPoshtaResponse Successful Response
     * @throws ApiError
     */
    public static updateUkrPoshtaDataApiUkrPoshtaUkrPoshtaIdPartialUpdatePatch(
        ukrPoshtaId: number,
        requestBody: UkrPoshtaPartialUpdate,
    ): CancelablePromise<UkrPoshtaResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/ukr_poshta/{ukr_poshta_id}/partial-update',
            path: {
                'ukr_poshta_id': ukrPoshtaId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
