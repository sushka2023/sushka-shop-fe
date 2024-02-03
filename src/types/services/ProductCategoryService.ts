/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductCategoryArchiveModel } from '../models/ProductCategoryArchiveModel';
import type { ProductCategoryEditModel } from '../models/ProductCategoryEditModel';
import type { ProductCategoryModel } from '../models/ProductCategoryModel';
import type { ProductCategoryResponse } from '../models/ProductCategoryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductCategoryService {
    /**
     * Product Categories
     * The product_categories function returns a list of all product categories in the database.
     *
     * Args:
     * db: Session: Access the database
     *
     * Returns:
     * A list of product categories
     * @returns ProductCategoryResponse Successful Response
     * @throws ApiError
     */
    public static productCategoriesApiProductCategoryAllGet(): CancelablePromise<Array<ProductCategoryResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/product_category/all',
        });
    }
    /**
     * Product Categories For Crm
     * The product_categories function returns a list of all product categories in the database.
     *
     * Args:
     * db: Session: Access the database
     *
     * Returns:
     * A list of product categories
     * @returns ProductCategoryResponse Successful Response
     * @throws ApiError
     */
    public static productCategoriesForCrmApiProductCategoryAllForCrmGet(): CancelablePromise<Array<ProductCategoryResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/product_category/all_for_crm',
        });
    }
    /**
     * Create Category
     * The create_category function creates a new product category.
     * Args:
     * body (ProductCategoryModel): The ProductCategoryModel object to be created.
     * db (Session, optional): SQLAlchemy Session. Defaults to Depends(get_db).
     *
     * Args:
     * body: ProductCategoryModel: Get the name of the product category to be created
     * db: Session: Get the database session
     *
     * Returns:
     * A productcategorymodel object
     * @param requestBody
     * @returns ProductCategoryResponse Successful Response
     * @throws ApiError
     */
    public static createCategoryApiProductCategoryCreatePost(
        requestBody: ProductCategoryModel,
    ): CancelablePromise<ProductCategoryResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/product_category/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Category
     * @param requestBody
     * @returns ProductCategoryResponse Successful Response
     * @throws ApiError
     */
    public static createCategoryApiProductCategoryEditPatch(
        requestBody: ProductCategoryEditModel,
    ): CancelablePromise<ProductCategoryResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/product_category/edit',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Archive Product Category
     * The archive_product_category function is used to archive a product category.
     * The function takes in the id of the product category to be archived and returns an object containing information about
     * the archived product category.
     *
     * Args:
     * body: ProductCategoryArchiveModel: Get the id of the product category to be archived
     * db: Session: Access the database
     *
     * Returns:
     * A productcategoryarchivemodel object
     * @param requestBody
     * @returns ProductCategoryResponse Successful Response
     * @throws ApiError
     */
    public static archiveProductCategoryApiProductCategoryArchivePut(
        requestBody: ProductCategoryArchiveModel,
    ): CancelablePromise<ProductCategoryResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/product_category/archive',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Archive Product
     * The archive_product function is used to unarchive a product category.
     * The function takes in the id of the product category and returns an object containing information about that
     * product category.
     *
     * Args:
     * body: ProductCategoryArchiveModel: Get the id of the product category to be deleted
     * db: Session: Get the database session
     *
     * Returns:
     * A productcategory object
     * @param requestBody
     * @returns ProductCategoryResponse Successful Response
     * @throws ApiError
     */
    public static archiveProductApiProductCategoryUnarchivePut(
        requestBody: ProductCategoryArchiveModel,
    ): CancelablePromise<ProductCategoryResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/product_category/unarchive',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
