/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageResponse } from './ImageResponse';
import type { PriceResponse } from './PriceResponse';
import { ProductCategory } from './ProductCategory';
import type { ProductStatus } from './ProductStatus';
import type { ProductSubCategoryResponse } from './ProductSubCategoryResponse';
export type ProductResponse = {
    id: number;
    name: string;
    description: string;
  product_category_id: ProductCategory;
    new_product: boolean;
    is_popular: boolean;
    is_favorite: boolean;
    product_status: ProductStatus;
    sub_categories?: Array<ProductSubCategoryResponse>;
    images: Array<ImageResponse>;
    prices: Array<PriceResponse>;
};

