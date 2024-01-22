/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FavoriteResponse } from '../models/FavoriteResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FavoriteService {
    /**
     * Create
     * The create function creates a new favorite for the current user.
     * If the user already has a favorite, it will return an error.
     *
     * Args:
     * current_user: User: Get the user id from the token
     * db: Session: Pass the database session to the repository
     *
     * Returns:
     * A favorite object
     * @returns FavoriteResponse Successful Response
     * @throws ApiError
     */
    public static createApiFavoritesCreatePost(): CancelablePromise<FavoriteResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/favorites/create',
        });
    }
}
