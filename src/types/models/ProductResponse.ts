/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageResponse } from './ImageResponse';
import type { PriceResponse } from './PriceResponse';
import type { ProductCategoryResponse } from './ProductCategoryResponse';
import type { ProductStatus } from './ProductStatus';
import type { ProductSubCategoryResponse } from './ProductSubCategoryResponse';
export type ProductResponse = {
    id: number;
    name: string;
    description: string;
    product_category_id: number;
    product_category: ProductCategoryResponse;
    new_product: boolean;
    is_popular: boolean;
    is_favorite: boolean;
    is_deleted: boolean;
    product_status: ProductStatus;
    sub_categories?: Array<ProductSubCategoryResponse>;
    images: Array<ImageResponse>;
    prices: Array<PriceResponse>;
};

