/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NovaPoshtaAddressDeliveryCreate } from '../models/NovaPoshtaAddressDeliveryCreate';
import type { NovaPoshtaCreate } from '../models/NovaPoshtaCreate';
import type { PostAddressDeliveryResponse } from '../models/PostAddressDeliveryResponse';
import type { PostNovaPoshtaOffice } from '../models/PostNovaPoshtaOffice';
import type { PostResponse } from '../models/PostResponse';
import type { PostUkrPoshtaResponse } from '../models/PostUkrPoshtaResponse';
import type { PostUkrPostalOffice } from '../models/PostUkrPostalOffice';
import type { PostWarehouseResponse } from '../models/PostWarehouseResponse';
import type { UkrPoshtaCreate } from '../models/UkrPoshtaCreate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostalOfficesService {
    /**
     * Create Nova Poshta Warehouse And Associate With Post
     * The function creates novaposhta data and adds to an exists post for the current user.
     *
     * Args:
     * nova_post_warehouse: NovaPoshtaCreate: Validate the request body
     * current_user: User: Get the current user
     * db: Session: Access the database
     *
     * Returns:
     * Message about successfully adding novaposhta data
     * A novaposhta object
     * @param requestBody
     * @returns PostWarehouseResponse Successful Response
     * @throws ApiError
     */
    public static createNovaPoshtaWarehouseAndAssociateWithPostApiPostsCreateNovaPoshtaWarehouseAndAssociateWithPostPost(
        requestBody: NovaPoshtaCreate,
    ): CancelablePromise<PostWarehouseResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts/create_nova_poshta_warehouse_and_associate_with_post',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Nova Poshta Address Delivery And Associate With Post
     * The function creates novaposhta data and adds to an exists post for the current user.
     *
     * Args:
     * nova_post_address_delivery: NovaPoshtaAddressDeliveryCreate: Validate the request body
     * current_user: User: Get the current user
     * db: Session: Access the database
     *
     * Returns:
     * Message about successfully adding novaposhta data
     * A novaposhta object
     * @param requestBody
     * @returns PostAddressDeliveryResponse Successful Response
     * @throws ApiError
     */
    public static createNovaPoshtaAddressDeliveryAndAssociateWithPostApiPostsCreateNovaPoshtaAddressDeliveryAndAssociateWithPostPost(
        requestBody: NovaPoshtaAddressDeliveryCreate,
    ): CancelablePromise<PostAddressDeliveryResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts/create_nova_poshta_address_delivery_and_associate_with_post',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Ukr Poshta And Associate With Post
     * The function creates ukrposhta data and adds to an exists post for the current user.
     *
     * Args:
     * ukr_post_address: UkrPoshtaCreate: Validate the request body
     * current_user: User: Get the current user
     * db: Session: Access the database
     *
     * Returns:
     * Message about successfully adding novaposhta data
     * An ukrposhta object
     * @param requestBody
     * @returns PostUkrPoshtaResponse Successful Response
     * @throws ApiError
     */
    public static createUkrPoshtaAndAssociateWithPostApiPostsCreateUkrPoshtaAndAssociateWithPostPost(
        requestBody: UkrPoshtaCreate,
    ): CancelablePromise<PostUkrPoshtaResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts/create_ukr_poshta_and_associate_with_post',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get My Post Offices
     * The function returns all post offices for current user in the database.
     *
     * Args:
     * current_user: User: Get the current user
     * db: Session: Access the database
     *
     * Returns:
     * A post object
     * @returns PostResponse Successful Response
     * @throws ApiError
     */
    public static getMyPostOfficesApiPostsMyPostOfficesGet(): CancelablePromise<PostResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts/my-post-offices',
        });
    }
    /**
     * Remove Nova Poshta Data
     * The remove_nova_poshta_data function deleted an exists post with novaposhta data for the current user.
     *
     * Args:
     * nova_poshta_data: PostNovaPoshtaOffice: Validate the request body
     * current_user: User: Get the current user
     * db: Session: Access the database
     *
     * Returns:
     * None
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static removeNovaPoshtaDataApiPostsRemoveNovaPoshtaDataDelete(
        requestBody: PostNovaPoshtaOffice,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/posts/remove_nova_poshta_data',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Remove Ukr Postal Office
     * The remove_ukr_postal_office function deleted an exists post with address for the current user.
     *
     * Args:
     * ukr_poshta_data: PostUkrPostalOffice: Validate the request body
     * current_user: User: Get the current user
     * db: Session: Access the database
     *
     * Returns:
     * None
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static removeUkrPostalOfficeApiPostsRemoveUkrPostalOfficeDelete(
        requestBody: PostUkrPostalOffice,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/posts/remove_ukr_postal_office',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
