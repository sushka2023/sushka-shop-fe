/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PostMessageResponse } from '../models/PostMessageResponse';
import type { PostNovaPoshtaOffice } from '../models/PostNovaPoshtaOffice';
import type { PostResponse } from '../models/PostResponse';
import type { PostUkrPostalOffice } from '../models/PostUkrPostalOffice';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostalOfficesService {
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
     * Add Nova Poshta Data
     * The add_nova_poshta_data function updates an exists post for the current user.
     *
     * Args:
     * nova_poshta_data: PostNovaPoshtaOffice: Validate the request body
     * current_user: User: Get the current user
     * db: Session: Access the database
     *
     * Returns:
     * Message about successfully adding novaposhta data
     * @param requestBody
     * @returns PostMessageResponse Successful Response
     * @throws ApiError
     */
    public static addNovaPoshtaDataApiPostsAddNovaPoshtaDataPost(
        requestBody: PostNovaPoshtaOffice,
    ): CancelablePromise<PostMessageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts/add_nova_poshta_data',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
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
     * Message about successfully deleting novaposhta data from post
     * @param requestBody
     * @returns PostMessageResponse Successful Response
     * @throws ApiError
     */
    public static removeNovaPoshtaDataApiPostsRemoveNovaPoshtaDataDelete(
        requestBody: PostNovaPoshtaOffice,
    ): CancelablePromise<PostMessageResponse> {
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
     * Add Ukr Postal Office
     * The add_ukr_postal_office function updates an exists post for the current user.
     *
     * Args:
     * ukr_poshta_data: PostAddUkrPostalOffice: Validate the request body
     * current_user: User: Get the current user
     * db: Session: Access the database
     *
     * Returns:
     * Message about successfully adding an address
     * @param requestBody
     * @returns PostMessageResponse Successful Response
     * @throws ApiError
     */
    public static addUkrPostalOfficeApiPostsAddUkrPostalOfficePost(
        requestBody: PostUkrPostalOffice,
    ): CancelablePromise<PostMessageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts/add_ukr_postal_office',
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
     * ukr_poshta_data: PostAddUkrPostalOffice: Validate the request body
     * current_user: User: Get the current user
     * db: Session: Access the database
     *
     * Returns:
     * Message about successfully deleting an address from post
     * @param requestBody
     * @returns PostMessageResponse Successful Response
     * @throws ApiError
     */
    public static removeUkrPostalOfficeApiPostsRemoveUkrPostalOfficeDelete(
        requestBody: PostUkrPostalOffice,
    ): CancelablePromise<PostMessageResponse> {
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
