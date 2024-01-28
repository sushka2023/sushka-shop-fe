/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BasketResponse } from '../models/BasketResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BasketService {
    /**
     * Create
     * The create function creates a new basket for the current user.
     * If the user already has a basket, it will return an error.
     *
     * Args:
     * current_user: User: Get the current user
     * db: Session: Access the database
     *
     * Returns:
     * A basket object
     * @returns BasketResponse Successful Response
     * @throws ApiError
     */
    public static createApiBasketsCreatePost(): CancelablePromise<BasketResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/baskets/create',
        });
    }
}
