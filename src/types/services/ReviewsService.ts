/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReviewArchiveModel } from '../models/ReviewArchiveModel';
import type { ReviewCheckModel } from '../models/ReviewCheckModel';
import type { ReviewModel } from '../models/ReviewModel';
import type { ReviewResponse } from '../models/ReviewResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReviewsService {
    /**
     * Get Reviews
     * The function returns a list of all reviews in the database which were checked by an admin or a moderator.
     *
     * Args:
     * limit: int: Limit the number of reviews returned
     * offset: int: Specify the offset of the first review to be returned
     * db: Session: Access the database
     *
     * Returns:
     * A list of reviews
     * @param limit
     * @param offset
     * @returns ReviewResponse Successful Response
     * @throws ApiError
     */
    public static getReviewsApiReviewsGet(
        limit: number,
        offset: number,
    ): CancelablePromise<Array<ReviewResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reviews/',
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Reviews For Crm
     * The function returns a list of all reviews in the database.
     *
     * Args:
     * limit: int: Limit the number of reviews returned
     * offset: int: Specify the offset of the first review to be returned
     * db: Session: Access the database
     *
     * Returns:
     * A list of reviews
     * @param limit
     * @param offset
     * @returns ReviewResponse Successful Response
     * @throws ApiError
     */
    public static getReviewsForCrmApiReviewsAllForCrmGet(
        limit: number,
        offset: number,
    ): CancelablePromise<Array<ReviewResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reviews/all_for_crm',
            query: {
                'limit': limit,
                'offset': offset,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Review
     * The create_review function creates a new review to product in the database.
     *
     * Args:
     * review: ReviewModel: Validate the request body
     * db: Session: Pass the database session to the repository layer
     * current_user (User): the current user attempting to create the review
     *
     * Returns:
     * A review object
     * @param requestBody
     * @returns ReviewResponse Successful Response
     * @throws ApiError
     */
    public static createReviewApiReviewsCreatePost(
        requestBody: ReviewModel,
    ): CancelablePromise<ReviewResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/reviews/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Check Review
     * The check_review function checks a review.
     *
     * Args:
     * review: ReviewCheckModel: Get the id of the review to check and changed status of field is_checked
     * db: Session: Access the database
     *
     * Returns:
     * A review checked model object
     * @param requestBody
     * @returns ReviewResponse Successful Response
     * @throws ApiError
     */
    public static checkReviewApiReviewsCheckReviewPut(
        requestBody: ReviewCheckModel,
    ): CancelablePromise<ReviewResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/reviews/check_review',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Archive Review
     * The archive_review function is used to archive a review.
     * The function takes in the id of the review to be archived and returns an object containing information about
     * the archived review.
     *
     * Args:
     * review: ReviewArchiveModel: Get the id of the review to be archived
     * db: Session: Access the database
     *
     * Returns:
     * A review archive model object
     * @param requestBody
     * @returns ReviewResponse Successful Response
     * @throws ApiError
     */
    public static archiveReviewApiReviewsArchivePut(
        requestBody: ReviewArchiveModel,
    ): CancelablePromise<ReviewResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/reviews/archive',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Unarchive Review
     * The unarchive_review function is used to unarchive a review.
     * The function takes in the id of the review and returns an object containing information about that review.
     *
     * Args:
     * review: ReviewArchiveModel: Get the id of the review to be unarchived
     * db: Session: Access the database
     *
     * Returns:
     * A review unarchive model object
     * @param requestBody
     * @returns ReviewResponse Successful Response
     * @throws ApiError
     */
    public static unarchiveReviewApiReviewsUnarchivePut(
        requestBody: ReviewArchiveModel,
    ): CancelablePromise<ReviewResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/reviews/unarchive',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
