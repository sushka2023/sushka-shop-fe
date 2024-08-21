/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductChangeStatusResponse } from '../models/ProductChangeStatusResponse';
import type { ProductModel } from '../models/ProductModel';
import type { ProductResponse } from '../models/ProductResponse';
import type { ProductStatus } from '../models/ProductStatus';
import type { ProductWithTotalResponse } from '../models/ProductWithTotalResponse';
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
     *
     * :return: A list of products
     * @param limit
     * @param offset
     * @param weight
     * @param prCategoryId
     * @param sort
     * @returns ProductWithTotalResponse Successful Response
     * @throws ApiError
     */
    public static productsApiProductAllGet(
        limit: number,
        offset: number,
        weight?: string,
        prCategoryId?: number,
        sort: string = 'low_price',
    ): CancelablePromise<ProductWithTotalResponse> {
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
     * :param search_query: product search criterion (by name or id of the product)
     * :param db: Session: Pass the database connection to the function
     *
     * :return: A list of products
     * @param limit
     * @param offset
     * @param searchQuery
     * @param prStatus
     * @param prCategoryId
     * @returns ProductWithTotalResponse Successful Response
     * @throws ApiError
     */
    public static productsForCrmApiProductAllForCrmGet(
        limit: number,
        offset: number,
        searchQuery?: (number | string),
        prStatus?: ProductStatus,
        prCategoryId?: number,
    ): CancelablePromise<ProductWithTotalResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/product/all_for_crm',
            query: {
                'limit': limit,
                'offset': offset,
                'search_query': searchQuery,
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
     *
     * :return: A productresponse object
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
     * Edit Product
     * Edits an existing product in the database with new data provided in the request body.
     *
     * This function updates a product's information based on the provided product ID and
     * the data in the ProductModel. It handles conversion of product_id to integer,
     * checks for product existence, updates the product, and manages subcategories and images.
     *
     * Args:
     * product_id (str): The ID of the product to be edited. It should be convertible to an integer.
     * body (ProductModel): The new product data to update.
     * db (Session): The database session dependency.
     *
     * Raises:
     * HTTPException: If product_id is not an integer.
     * HTTPException: If the product with the given ID is not found.
     *
     * Returns:
     * ProductResponse: An object containing the updated product information.
     * @param productId
     * @param requestBody
     * @returns ProductResponse Successful Response
     * @throws ApiError
     */
    public static editProductApiProductEditProductIdPatch(
        productId: string,
        requestBody: ProductModel,
    ): CancelablePromise<ProductResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/product/edit/{product_id}',
            path: {
                'product_id': productId,
            },
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
     *
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
    /**
     * Change Product Status
     * The change_product_status function is used to change a product status.
     * The function takes in the id of the product to change it status
     * and returns an object containing information about that product.
     * If no such id exists, it raises a 404 error.
     *
     * Args:
     * product_id: int: Get the id of the product to change it status
     * pr_status: ProductStatus: the product status to be changed
     * (permitted: "new", "activated", "archived")
     * db: Session: Get the database session
     *
     * Returns:
     * A product object
     * @param productId
     * @param prStatus
     * @returns ProductChangeStatusResponse Successful Response
     * @throws ApiError
     */
    public static changeProductStatusApiProductProductIdChangeStatusPut(
        productId: number,
        prStatus?: ProductStatus,
    ): CancelablePromise<ProductChangeStatusResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/product/{product_id}/change_status',
            path: {
                'product_id': productId,
            },
            query: {
                'pr_status': prStatus,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Search All Products
     * The search_all_products function returns a list of products after search.
     *
     * :param limit: int: Limit the number of products returned
     * :param offset: int: Indicate the number of records to skip
     * :param search_query: product search criterion (by name or id of the product)
     * :param db: Session: Pass the database connection to the function
     *
     * Return: A list of products
     * @param limit
     * @param offset
     * @param searchQuery
     * @returns ProductWithTotalResponse Successful Response
     * @throws ApiError
     */
    public static searchAllProductsApiProductSearchGet(
        limit: number,
        offset: number,
        searchQuery?: (number | string),
    ): CancelablePromise<ProductWithTotalResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/product/search/',
            query: {
                'limit': limit,
                'offset': offset,
                'search_query': searchQuery,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
