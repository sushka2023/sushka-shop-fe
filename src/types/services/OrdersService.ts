/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderAdminNotesModel } from '../models/OrderAdminNotesModel';
import type { OrderAnonymUserModel } from '../models/OrderAnonymUserModel';
import type { OrderConfirmModel } from '../models/OrderConfirmModel';
import type { OrderMessageResponse } from '../models/OrderMessageResponse';
import type { OrderModel } from '../models/OrderModel';
import type { OrderResponse } from '../models/OrderResponse';
import type { OrdersCRMResponse } from '../models/OrdersCRMResponse';
import type { OrdersCRMWithTotalCountResponse } from '../models/OrdersCRMWithTotalCountResponse';
import type { OrdersCurrentUserWithTotalCountResponse } from '../models/OrdersCurrentUserWithTotalCountResponse';
import type { OrdersResponseWithMessage } from '../models/OrdersResponseWithMessage';
import type { OrdersStatuses } from '../models/OrdersStatuses';
import type { OrdersUserCRMWithTotalCountResponse } from '../models/OrdersUserCRMWithTotalCountResponse';
import type { OrdersWithMessage } from '../models/OrdersWithMessage';
import type { UpdateOrderStatus } from '../models/UpdateOrderStatus';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrdersService {
    /**
     * Create Order Auth User
     * The create of order function creates a new order in the database.
     *
     * Args:
     * order_info: OrderModel: Validate the request body
     * (payment_type: (permitted: "wayforpay", "requisite", "cash_on_delivery_np"))
     * background_tasks: BackgroundTasks: Add a task to the background tasks queue
     * db: Session: Pass the database session to the repository layer
     * current_user (User): the current user attempting to create the order
     *
     * Returns:
     * An order object
     * @param requestBody
     * @returns OrdersWithMessage Successful Response
     * @throws ApiError
     */
    public static createOrderAuthUserApiOrdersCreateForAuthUserPost(
        requestBody: OrderModel,
    ): CancelablePromise<OrdersWithMessage> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/orders/create_for_auth_user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Order Anonym User
     * The create of order function creates a new order in the database.
     *
     * Args:
     * order_data: OrderAnonymUserModel: Validate the request body
     * (post_type: (permitted: "nova_poshta_warehouse", "nova_poshta_address", "ukr_poshta"))
     *
     * background_tasks: BackgroundTasks: Add a task to the background tasks queue
     * db: Session: Pass the database session to the repository layer
     * Returns:
     * An order object
     * @param requestBody
     * @returns OrdersResponseWithMessage Successful Response
     * @throws ApiError
     */
    public static createOrderAnonymUserApiOrdersCreateForAnonymUserPost(
        requestBody: OrderAnonymUserModel,
    ): CancelablePromise<OrdersResponseWithMessage> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/orders/create_for_anonym_user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Orders For Crm
     * The orders_for_crm function returns a list of orders for the CRM.
     *
     * :param limit: int: Limit the number of orders returned
     * :param offset: int: Indicate the number of records to skip
     * :param order_status: OrdersStatuses: Filter orders by status
     * :param order_id: Optional[int]: Search orders by id
     * :param sort_order: Literal["ascending", "descending"]: Sorting orders by created date
     * :param db: Session: Pass the database connection to the function
     *
     * :return: A list of orders
     * @param limit
     * @param offset
     * @param orderStatus
     * @param orderId
     * @param sortOrder
     * @returns OrdersCRMWithTotalCountResponse Successful Response
     * @throws ApiError
     */
    public static getOrdersForCrmApiOrdersAllForCrmGet(
        limit: number,
        offset: number,
        orderStatus?: OrdersStatuses,
        orderId?: number,
        sortOrder: 'ascending' | 'descending' = 'descending',
    ): CancelablePromise<OrdersCRMWithTotalCountResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/all_for_crm',
            query: {
                'limit': limit,
                'offset': offset,
                'order_status': orderStatus,
                'order_id': orderId,
                'sort_order': sortOrder,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Order By Id For Crm
     * The get_order_by_id_for_crm function returns an order by id for the CRM.
     *
     * :param order_id: Get the id of the order
     * :param db: Session: Pass the database connection to the function
     *
     * :return: An order
     * @param orderId
     * @returns OrdersCRMResponse Successful Response
     * @throws ApiError
     */
    public static getOrderByIdForCrmApiOrdersOrderIdForCrmGet(
        orderId: number,
    ): CancelablePromise<OrdersCRMResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/{order_id}/for_crm',
            path: {
                'order_id': orderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Orders By User Id For Crm
     * The get_order_by_user_id_for_crm function returns all orders by user_id for the CRM.
     *
     * :param limit: int: Limit the number of orders returned
     * :param offset: int: Indicate the number of records to skip
     * :param user_id: Get the id of the user to get all orders for him
     * :param db: Session: Pass the database connection to the function
     *
     * Return: List of orders for the specific user
     * @param userId
     * @param limit
     * @param offset
     * @returns OrdersUserCRMWithTotalCountResponse Successful Response
     * @throws ApiError
     */
    public static getOrdersByUserIdForCrmApiOrdersForCrmUserGet(
        userId: number,
        limit: number,
        offset: number,
    ): CancelablePromise<OrdersUserCRMWithTotalCountResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/for_crm/user',
            query: {
                'user_id': userId,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Orders Current User
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
     * @returns OrdersCurrentUserWithTotalCountResponse Successful Response
     * @throws ApiError
     */
    public static getOrdersCurrentUserApiOrdersForCurrentUserGet(
        limit: number,
        offset: number,
    ): CancelablePromise<OrdersCurrentUserWithTotalCountResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/for_current_user',
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
     * Get Order By Id For Current User
     * The function returns an order in the database which was created by a current user.
     *
     * Args:
     * order_id: Get the id of the order of current user
     * current_user (User): the current user who created the orders'
     * db: Session: Access the database
     *
     * Returns:
     * An order
     * @param orderId
     * @returns OrderResponse Successful Response
     * @throws ApiError
     */
    public static getOrderByIdForCurrentUserApiOrdersOrderIdForCurrentUserGet(
        orderId: number,
    ): CancelablePromise<OrderResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/{order_id}/for_current_user',
            path: {
                'order_id': orderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Confirm Payment Of Order
     * The confirm_payment_of_order function confirms a payment of order.
     *
     * Args:
     * order_data: OrderConfirmModel: Get the id of the order to confirm the payment of the orders'
     * db: Session: Access the database
     *
     * Returns:
     * Message that the payment of the order was confirmed successfully
     * @param requestBody
     * @returns OrderMessageResponse Successful Response
     * @throws ApiError
     */
    public static confirmPaymentOfOrderApiOrdersConfirmPaymentOfOrderPut(
        requestBody: OrderConfirmModel,
    ): CancelablePromise<OrderMessageResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/orders/confirm_payment_of_order',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Change Order Status
     * The change_order_status function changes an order status.
     *
     * Args:
     * update_data: UpdateOrderStatus: the order status to be changed
     * (permitted: "new", "in processing", "shipped", "delivered", "cancelled")
     *
     * order_id: Get the id of the order to change it status
     * db: Session: Access the database
     *
     * Returns:
     * Message that the status of the order was changed successfully
     * @param orderId
     * @param requestBody
     * @returns OrderMessageResponse Successful Response
     * @throws ApiError
     */
    public static changeOrderStatusApiOrdersOrderIdUpdateStatusPut(
        orderId: number,
        requestBody: UpdateOrderStatus,
    ): CancelablePromise<OrderMessageResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/orders/{order_id}/update_status',
            path: {
                'order_id': orderId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Add Notes To Order
     * The add_notes_to_order function adds notes to the order.
     *
     * Args:
     * data: OrderAdminNotesModel: adding notes to the order by admin or moderator
     * order_id: Get the id of the order to add comment
     * db: Session: Access the database
     *
     * Returns:
     * Message that the note to the order was added successfully
     * @param orderId
     * @param requestBody
     * @returns OrderMessageResponse Successful Response
     * @throws ApiError
     */
    public static addNotesToOrderApiOrdersOrderIdAddNotesPut(
        orderId: number,
        requestBody: OrderAdminNotesModel,
    ): CancelablePromise<OrderMessageResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/orders/{order_id}/add_notes',
            path: {
                'order_id': orderId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
