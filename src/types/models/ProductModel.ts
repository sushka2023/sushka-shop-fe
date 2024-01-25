/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductStatus } from './ProductStatus';
export type ProductModel = {
    name: string;
    description: string;
    product_category_id: number;
    sub_categories_id: Array<number>;
    new_product: boolean;
    is_popular: boolean;
    product_status: ProductStatus;
};

