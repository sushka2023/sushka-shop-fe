/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductArchiveModel } from '../models/ProductArchiveModel';
import type { ProductModel } from '../models/ProductModel';
import type { ProductResponse } from '../models/ProductResponse';
import type { ProductStatus } from '../models/ProductStatus';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductService {
    /**
     * Products
     * The products function returns a list of products.
     * The function accepts the following parameters:
     * limit - number of products to return
     * offset - number of products to skip
     * weight - product weight in grams, can be specified as a range or single value, for example str: 50,100,150,200,300,400,500,1000 (optional)
     * pr_category_id - id category from which you want to get the list of goods (optional)
     *
     * :param limit: int: Limit the number of products to be displayed
     * :param offset: int: Specify the offset of the list
     * :param weight: str: Filter the products by weight (50,100,150,200,300,400,500,1000)
     * :param pr_category_id: int: Filter the products by category
     * :param sort: str: Sort the list of products by price or date
     * :param db: Session: Pass the database session to the function
     * :return: A list of products
     * @param limit
     * @param offset
     * @param weight
     * @param prCategoryId
     * @param sort
     * @returns ProductResponse Successful Response
     * @throws ApiError
     */
    public static productsApiProductAllGet(
        limit: number,
        offset: number,
        weight?: string,
        prCategoryId?: number,
        sort: string = 'low_price',
    ): CancelablePromise<Array<ProductResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/product/all',
            query: {
                'limit': limit,
                'offset': offset,
                'weight': weight,
                'pr_category_id': prCategoryId,
                'sort': sort,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Products For Crm
     * The products_for_crm function returns a list of products for the CRM.
     *
     * :param limit: int: Limit the number of products returned
     * :param offset: int: Indicate the number of records to skip
     * :param pr_status: ProductStatus: Filter products by status
     * :param pr_category_id: int: Filter the products by category
     * :param db: Session: Pass the database connection to the function
     * :return: A list of products
     * @param limit
     * @param offset
     * @param prStatus
     * @param prCategoryId
     * @returns ProductResponse Successful Response
     * @throws ApiError
     */
    public static productsForCrmApiProductAllForCrmGet(
        limit: number,
        offset: number,
        prStatus?: ProductStatus,
        prCategoryId?: number,
    ): CancelablePromise<Array<ProductResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/product/all_for_crm',
            query: {
                'limit': limit,
                'offset': offset,
                'pr_status': prStatus,
                'pr_category_id': prCategoryId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Product
     * The create_product function creates a new product in the database.
     * Args:
     * body (ProductModel): The ProductModel object to be created.
     * db (Session, optional): SQLAlchemy Session. Defaults to Depends(get_db).
     *
     * :param body: ProductModel: Validate the request body
     * :param db: Session: Get the database session
     * :return: A productresponse object
     * :doc-author: Trelent
     * @param requestBody
     * @returns ProductResponse Successful Response
     * @throws ApiError
     */
    public static createProductApiProductCreatePost(
        requestBody: ProductModel,
    ): CancelablePromise<ProductResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/product/create',
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
     * The function takes in the id of the product to be archived and returns an object containing information about that product.
     * If no such id exists, it raises a 404 error.
     *
     *
     * Args:
     * body: ProductArchiveModel: Get the id of the product to be archived
     * db: Session: Get the database session
     *
     * Returns:
     * A product object
     * @param requestBody
     * @returns ProductResponse Successful Response
     * @throws ApiError
     */
    public static archiveProductApiProductArchivePut(
        requestBody: ProductArchiveModel,
    ): CancelablePromise<ProductResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/product/archive',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Unarchive Product
     * The archive_product function is used to unarchive a product.
     * The function takes in the id of the product and returns an object containing information about that product.
     *
     * Args:
     * body: ProductArchiveModel: Get the id of the product to be archived
     * db: Session: Get the database session
     *
     * Returns:
     * A product object
     * @param requestBody
     * @returns ProductResponse Successful Response
     * @throws ApiError
     */
    public static unarchiveProductApiProductUnarchivePut(
        requestBody: ProductArchiveModel,
    ): CancelablePromise<ProductResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/product/unarchive',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get One Product
     * The get_one_product function returns a single product from the database.
     *
     * :param product_id: int: Specify the product id
     * :param db: Session: Pass the database session to the function
     * :return: A product by id
     * :doc-author: Trelent
     * @param productId
     * @returns ProductResponse Successful Response
     * @throws ApiError
     */
    public static getOneProductApiProductProductIdGet(
        productId: number,
    ): CancelablePromise<ProductResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/product/{product_id}',
            path: {
                'product_id': productId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
