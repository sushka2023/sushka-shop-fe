/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PriceResponse } from './PriceResponse';
import type { ProductResponseForOrder } from './ProductResponseForOrder';
export type OrderedProductResponse = {
    id: number;
    product_id: number;
    products: ProductResponseForOrder;
    price_id: number;
    prices: PriceResponse;
    order_id: number;
    quantity: number;
};

