/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductChangeStatusResponse } from '../models/ProductChangeStatusResponse';
import type { ProductEdit } from '../models/ProductEdit';
import type { ProductModel } from '../models/ProductModel';
import type { ProductPopularResponse } from '../models/ProductPopularResponse';
import type { ProductResponse } from '../models/ProductResponse';
import type { ProductStatus } from '../models/ProductStatus';
import type { ProductWithTotalResponse } from '../models/ProductWithTotalResponse';
import type { SortBy } from '../models/SortBy';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductService {
    /**
     * Get All Activated Products
     * The products function returns a list of products.
     * The function accepts the following parameters:
     * limit - number of products to return
     * offset - number of products to skip
     * weight - product weight in grams, can be specified as a range or single value,
     * ( for example str: 50,100,150,200,300,400,500,1000 (optional))
     * pr_category_id - id category from which you want to get the list of goods (optional)
     * is_popular - an option of products to filter them and receive the list of popular products (optional)
     *
     * :param limit: int: Limit the number of products to be displayed
     * :param offset: int: Specify the offset of the list
     * :param weight: str: Filter the products by weight (50,100,150,200,300,400,500,1000)
     * :param pr_category_id: int: Filter the products by category
     * :param is_popular: bool: Filter the products by is_popular option
     * :param sort: str: Sort the list of products by price or date
     * :param db: Session: Pass the database session to the function
     *
     * Returns a list of products with filtering and sorting options.
     * @param limit
     * @param offset
     * @param prCategoryId
     * @param weight
     * @param isPopular
     * @param sort
     * @returns ProductWithTotalResponse Successful Response
     * @throws ApiError
     */
    public static getAllActivatedProductsApiProductAllGet(
        limit: number,
        offset: number,
        prCategoryId?: number,
        weight?: string,
        isPopular?: boolean,
        sort?: SortBy,
    ): CancelablePromise<ProductWithTotalResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/product/all',
            query: {
                'limit': limit,
                'offset': offset,
                'pr_category_id': prCategoryId,
                'weight': weight,
                'is_popular': isPopular,
                'sort': sort,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get All Products For Crm
     * The products_for_crm function returns a list of products for the CRM.
     *
     * :param limit: int: Limit the number of products returned
     * :param offset: int: Indicate the number of records to skip
     * :param pr_status: ProductStatus: Filter products by status
     * :param pr_category_id: int: Filter the products by category
     * :param is_popular: bool: Filter the products by is_popular option
     * :param search_query: product search criterion (by name or id of the product)
     * :param db: Session: Pass the database connection to the function
     *
     * :return: A list of products
     * @param limit
     * @param offset
     * @param searchQuery
     * @param prStatus
     * @param prCategoryId
     * @param isPopular
     * @returns ProductWithTotalResponse Successful Response
     * @throws ApiError
     */
    public static getAllProductsForCrmApiProductAllForCrmGet(
        limit: number,
        offset: number,
        searchQuery?: (number | string),
        prStatus?: ProductStatus,
        prCategoryId?: number,
        isPopular?: boolean,
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
                'is_popular': isPopular,
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
     * This function updates a product's information based on the provided product ID and the data
     * in the ProductEdit. It handles updates of the product, and manages subcategories and images.
     *
     * Args:
     * product_id (int): The ID of the product to be edited.
     * body (ProductEdit): The new product data to update.
     * db (Session): The database session dependency.
     *
     * Returns:
     * ProductResponse: An object containing the updated product information.
     * @param productId
     * @param requestBody
     * @returns ProductResponse Successful Response
     * @throws ApiError
     */
    public static editProductApiProductEditProductIdPatch(
        productId: number,
        requestBody: ProductEdit,
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
    /**
     * Select Product As Popular
     * The select_product_as_popular function is used to select the product as popular or not.
     * The function takes the id of the product to select it as popular or not popular
     * and returns an object containing information about that product.
     * If no such id exists, it raises a 404 error.
     *
     * Args:
     * product_id: int: Get the id of the product to select it as popular or not popular
     * db: Session: Get the database session
     *
     * Returns:
     * A product object
     * @param productId
     * @returns ProductPopularResponse Successful Response
     * @throws ApiError
     */
    public static selectProductAsPopularApiProductSelectPopularPut(
        productId: number,
    ): CancelablePromise<ProductPopularResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/product/select_popular',
            query: {
                'product_id': productId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
