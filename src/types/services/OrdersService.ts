/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderConfirmModel } from '../models/OrderConfirmModel';
import type { OrderModel } from '../models/OrderModel';
import type { OrderResponse } from '../models/OrderResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrdersService {
    /**
     * Get Orders
     * The function returns a list of all orders in the database which were created by a current user.
     *
     * Args:
     * limit: int: Limit the number of orders returned
     * offset: int: Specify the offset of the first order to be returned
     * current_user (User): the current user who created the orders'
     * db: Session: Access the database
     *
     * Returns:
     * A list of orders
     * @param limit
     * @param offset
     * @returns OrderResponse Successful Response
     * @throws ApiError
     */
    public static getOrdersApiOrdersGet(
        limit: number,
        offset: number,
    ): CancelablePromise<Array<OrderResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/',
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Orders For Crm
     * The function returns a list of all orders in the database.
     *
     * Args:
     * limit: int: Limit the number of orders returned
     * offset: int: Specify the offset of the first order to be returned
     * db: Session: Access the database
     *
     * Returns:
     * A list of orders
     * @param limit
     * @param offset
     * @returns OrderResponse Successful Response
     * @throws ApiError
     */
    public static getOrdersForCrmApiOrdersAllForCrmGet(
        limit: number,
        offset: number,
    ): CancelablePromise<Array<OrderResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/all_for_crm',
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Order
     * The create_order function creates a new order in the database.
     *
     * Args:
     * order_data: OrderModel: Validate the request body
     * db: Session: Pass the database session to the repository layer
     * current_user (User): the current user attempting to create the order
     *
     * Returns:
     * An order object
     * @param requestBody
     * @returns OrderResponse Successful Response
     * @throws ApiError
     */
    public static createOrderApiOrdersCreatePost(
        requestBody: OrderModel,
    ): CancelablePromise<OrderResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/orders/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Confirm Order
     * The confirm_order function confirms an order.
     *
     * Args:
     * order: OrderConfirmModel: Get the id of the order to confirm and changed status of field confirmation_manager
     * db: Session: Access the database
     *
     * Returns:
     * An order confirmed model object
     * @param requestBody
     * @returns OrderResponse Successful Response
     * @throws ApiError
     */
    public static confirmOrderApiOrdersConfirmOrderPut(
        requestBody: OrderConfirmModel,
    ): CancelablePromise<OrderResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/orders/confirm_order',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
