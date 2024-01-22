/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FavoriteItemsModel } from '../models/FavoriteItemsModel';
import type { FavoriteItemsResponse } from '../models/FavoriteItemsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FavoriteItemsService {
    /**
     * Favorite Items
     * The favorite_items function returns a list of favorite items for the current user.
     * The function takes in a User object and Session object as parameters, which are used to query the database.
     * If no favorite items are found, an HTTP 404 error is raised.
     *
     * Args:
     * current_user: User: Get the current user
     * db: Session: Get the database session
     *
     * Returns:
     * A list of favorite items
     * @returns FavoriteItemsResponse Successful Response
     * @throws ApiError
     */
    public static favoriteItemsApiFavoriteItemsGet(): CancelablePromise<Array<FavoriteItemsResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/favorite_items/',
        });
    }
    /**
     * Add To Favorites
     * The add_to_favorites function adds a product to the user's favorites list.
     * The function takes in a body of type FavoriteItemsModel, which contains the product_id of the item to be added.
     * It also takes in an optional current_user parameter, which is used for authentication purposes and defaults to None.
     * Finally it takes in an optional db parameter that defaults to None as well.
     *
     * Args:
     * body: FavoriteItemsModel: Get the product_id from the request body
     * current_user: User: Get the current user
     * db: Session: Get the database session
     *
     * Returns:
     * A favorite item
     * @param requestBody
     * @returns FavoriteItemsResponse Successful Response
     * @throws ApiError
     */
    public static addToFavoritesApiFavoriteItemsAddPost(
        requestBody: FavoriteItemsModel,
    ): CancelablePromise<FavoriteItemsResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/favorite_items/add',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Remove Product
     * The remove_product function removes a product from the user's favorite list.
     * The function takes in a body of type FavoriteItemsModel, which contains the id of the product to be removed.
     * It also takes in an optional current_user parameter, which is used to identify who is making this request.
     * This parameter defaults to None if no user is logged in and will throw an error if no user can be found.
     *
     * Args:
     * body: FavoriteItemsModel: Get the product_id from the body of the request
     * current_user: User: Get the current user
     * db: Session: Get the database session
     *
     * Returns:
     * None
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static removeProductApiFavoriteItemsRemoveDelete(
        requestBody: FavoriteItemsModel,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/favorite_items/remove',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
