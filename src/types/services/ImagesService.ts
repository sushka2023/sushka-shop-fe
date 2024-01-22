/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_image_api_images_create_img_product_post } from '../models/Body_create_image_api_images_create_img_product_post';
import type { Body_create_image_api_images_create_img_review_post } from '../models/Body_create_image_api_images_create_img_review_post';
import type { ImageResponse } from '../models/ImageResponse';
import type { ImageResponseReview } from '../models/ImageResponseReview';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ImagesService {
    /**
     * Create Image
     * @param formData
     * @returns ImageResponse Successful Response
     * @throws ApiError
     */
    public static createImageApiImagesCreateImgProductPost(
        formData: Body_create_image_api_images_create_img_product_post,
    ): CancelablePromise<ImageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/images/create_img_product',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Image
     * @param formData
     * @returns ImageResponseReview Successful Response
     * @throws ApiError
     */
    public static createImageApiImagesCreateImgReviewPost(
        formData: Body_create_image_api_images_create_img_review_post,
    ): CancelablePromise<ImageResponseReview> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/images/create_img_review',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
