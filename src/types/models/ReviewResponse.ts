/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageResponseReview } from './ImageResponseReview';
import type { Rating } from './Rating';
export type ReviewResponse = {
    id: number;
    user_id: number;
    product_id: number;
    rating: Rating;
    description: string;
    created_at: string;
    is_deleted: boolean;
    is_checked: boolean;
    images: Array<ImageResponseReview>;
};

