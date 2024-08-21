/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageResponse } from './ImageResponse';
import type { ProductCategoryResponse } from './ProductCategoryResponse';
import type { ProductStatus } from './ProductStatus';
export type ProductResponseForOrder = {
    id: number;
    name: string;
    description: string;
    product_category_id: number;
    product_category: ProductCategoryResponse;
    new_product: boolean;
    is_popular: boolean;
    is_favorite: boolean;
    product_status: ProductStatus;
    images: Array<ImageResponse>;
};

