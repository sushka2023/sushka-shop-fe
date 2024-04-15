/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BasketItemsModel } from '../models/BasketItemsModel';
import type { BasketItemsRemoveModel } from '../models/BasketItemsRemoveModel';
import type { BasketItemsResponse } from '../models/BasketItemsResponse';
import type { ChangeQuantityBasketItemsModel } from '../models/ChangeQuantityBasketItemsModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BasketItemsService {
    /**
     * Basket Items
     * The basket_items function returns a list of all the items in the basket.
     * The function takes an optional user_id parameter, which is used to filter
     * out only those items that belong to that particular user. If no user_id is
     * provided, then all basket items are returned.
     *
     * Args:
     * current_user: User: Get the current user from the database
     * db: Session: Access the database
     *
     * Returns:
     * A list of basket items
     * @returns BasketItemsResponse Successful Response
     * @throws ApiError
     */
    public static basketItemsApiBasketItemsGet(): CancelablePromise<Array<BasketItemsResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/basket_items/',
        });
    }
    /**
     * Add Items To Basket
     * The add_to_favorites function adds a product to the user's basket.
     *
     * Args:
     * body: BasketItemsModel: Get the product_id from the request body
     * current_user: User: Get the current user
     * db: Session: Create a database session
     *
     * Returns:
     * A basketitemsmodel object
     * @param requestBody
     * @returns BasketItemsResponse Successful Response
     * @throws ApiError
     */
    public static addItemsToBasketApiBasketItemsAddPost(
        requestBody: BasketItemsModel,
    ): CancelablePromise<BasketItemsResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/basket_items/add',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Remove Product
     * The remove_product function removes a product from the basket.
     * The function takes in a body of type BasketItemsRemoveModel, which contains the id of the product to be removed.
     * It also takes in an optional current_user parameter, which is used to identify whose basket we are removing from.
     * Finally, it takes in an optional db parameter, which is used for database access.
     *
     * Args:
     * body: BasketItemsRemoveModel: Get the product_id from the request body
     * current_user: User: Get the current user
     * db: Session: Get a database session
     *
     * Returns:
     * None
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static removeProductApiBasketItemsRemoveDelete(
        requestBody: BasketItemsRemoveModel,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/basket_items/remove',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Change Quantity Items To Basket
     * @param requestBody
     * @returns BasketItemsResponse Successful Response
     * @throws ApiError
     */
    public static changeQuantityItemsToBasketApiBasketItemsQuantityPatch(
        requestBody: ChangeQuantityBasketItemsModel,
    ): CancelablePromise<BasketItemsResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/basket_items/quantity',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
