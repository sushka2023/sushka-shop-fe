/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PriceArchiveModel } from '../models/PriceArchiveModel';
import type { PriceModel } from '../models/PriceModel';
import type { PriceResponse } from '../models/PriceResponse';
import type { TotalPriceModel } from '../models/TotalPriceModel';
import type { TotalPriceResponse } from '../models/TotalPriceResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PriceService {
    /**
     * Product Prices
     * The product_prices function returns a list of prices for the product with the given id.
     * If no such product exists, it raises an HTTP 404 error.
     *
     * Args:
     * id_product: int: Get the product id from the url
     * db: Session: Get the database session
     *
     * Returns:
     * A list of prices for a given product
     * @param idProduct
     * @returns PriceResponse Successful Response
     * @throws ApiError
     */
    public static productPricesApiPriceProductGet(
        idProduct: number,
    ): CancelablePromise<Array<PriceResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/price/product',
            query: {
                'id_product': idProduct,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Price
     * The create_price function creates a new price in the database.
     * The function takes a PriceModel object as input and returns the newly created price.
     *
     * Args:
     * body: PriceModel: Get the data from the request body
     * db: Session: Pass the database session to the repository
     *
     * Returns:
     * A new price object
     * @param requestBody
     * @returns PriceResponse Successful Response
     * @throws ApiError
     */
    public static createPriceApiPriceCreatePost(
        requestBody: PriceModel,
    ): CancelablePromise<PriceResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/price/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Archive Product
     * The archive_product function is used to archive a product.
     * It takes in the id of the product and archives it.
     * If the product does not exist, it returns a 404 error code with an appropriate message.
     * If the product has already been archived, it returns a 409 error code with an appropriate message.
     *
     * Args:
     * body: PriceArchiveModel: Get the id of the price to be archived
     * db: Session: Get the database session
     *
     * Returns:
     * A pricearchivemodel object
     * @param requestBody
     * @returns PriceResponse Successful Response
     * @throws ApiError
     */
    public static archiveProductApiPriceArchivePut(
        requestBody: PriceArchiveModel,
    ): CancelablePromise<PriceResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/price/archive',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Archive Product
     * The archive_product function takes a PriceArchiveModel object as input, and returns the archived price.
     * The function first checks if the price exists in the database. If it does not exist, an HTTP 404 error is raised.
     * If it does exist but has already been deleted (is_deleted = True), an HTTP 409 error is raised to indicate that there
     * is a conflict between what was requested and what currently exists in the database.
     *
     * Args:
     * body: PriceArchiveModel: Get the id of the price to be archived
     * db: Session: Pass the database session to the function
     *
     * Returns:
     * A price model
     * @param requestBody
     * @returns PriceResponse Successful Response
     * @throws ApiError
     */
    public static archiveProductApiPriceUnarchivePut(
        requestBody: PriceArchiveModel,
    ): CancelablePromise<PriceResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/price/unarchive',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Total Price
     * The total_price function calculates the total price of a given order.
     * The function takes in an id and returns the total price of that order.
     *
     * Args:
     * body: TotalPriceModel: Get the id of the product from the request body
     * db: Session: Get the database session
     *
     * Returns:
     * The total price of the order, which is calculated by adding up all the prices of
     * @param requestBody
     * @returns TotalPriceResponse Successful Response
     * @throws ApiError
     */
    public static totalPriceApiPriceTotalPricePost(
        requestBody: TotalPriceModel,
    ): CancelablePromise<TotalPriceResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/price/total_price',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
