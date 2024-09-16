/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageResponseStoreReview } from './ImageResponseStoreReview';
import type { Rating } from './Rating';
import type { UserReviewResponse } from './UserReviewResponse';
export type ReviewStoreResponse = {
    id: number;
    user_id: number;
    user: UserReviewResponse;
    rating: Rating;
    description: string;
    created_at: string;
    is_deleted: boolean;
    is_checked: boolean;
    images: Array<ImageResponseStoreReview>;
};

