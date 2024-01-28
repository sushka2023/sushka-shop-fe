/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductSubCategoryArchiveModel } from '../models/ProductSubCategoryArchiveModel';
import type { ProductSubCategoryEditModel } from '../models/ProductSubCategoryEditModel';
import type { ProductSubCategoryModel } from '../models/ProductSubCategoryModel';
import type { ProductSubCategoryResponse } from '../models/ProductSubCategoryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductSubCategoryService {
    /**
     * Product Sub Categories For Crm
     * @returns ProductSubCategoryResponse Successful Response
     * @throws ApiError
     */
    public static productSubCategoriesForCrmApiProductSubCategoryAllForCrmGet(): CancelablePromise<Array<ProductSubCategoryResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/product_sub_category/all_for_crm',
        });
    }
    /**
     * Create Sub Category
     * @param requestBody
     * @returns ProductSubCategoryResponse Successful Response
     * @throws ApiError
     */
    public static createSubCategoryApiProductSubCategoryCreatePost(
        requestBody: ProductSubCategoryModel,
    ): CancelablePromise<ProductSubCategoryResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/product_sub_category/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Edit Sub Category
     * @param requestBody
     * @returns ProductSubCategoryResponse Successful Response
     * @throws ApiError
     */
    public static editSubCategoryApiProductSubCategoryEditPatch(
        requestBody: ProductSubCategoryEditModel,
    ): CancelablePromise<ProductSubCategoryResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/product_sub_category/edit',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Archive Product Sub Category
     * @param requestBody
     * @returns ProductSubCategoryResponse Successful Response
     * @throws ApiError
     */
    public static archiveProductSubCategoryApiProductSubCategoryArchivePut(
        requestBody: ProductSubCategoryArchiveModel,
    ): CancelablePromise<ProductSubCategoryResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/product_sub_category/archive',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Unarchive Product Sub Category
     * @param requestBody
     * @returns ProductSubCategoryResponse Successful Response
     * @throws ApiError
     */
    public static unarchiveProductSubCategoryApiProductSubCategoryUnarchivePut(
        requestBody: ProductSubCategoryArchiveModel,
    ): CancelablePromise<ProductSubCategoryResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/product_sub_category/unarchive',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
