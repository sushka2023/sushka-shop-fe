/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_image_api_images_create_img_product_post } from '../models/Body_create_image_api_images_create_img_product_post';
import type { Body_create_image_api_images_create_img_review_post } from '../models/Body_create_image_api_images_create_img_review_post';
import type { ImageDeletedModel } from '../models/ImageDeletedModel';
import type { ImageResponse } from '../models/ImageResponse';
import type { ImageResponseReview } from '../models/ImageResponseReview';
import type { ImageSetMainModel } from '../models/ImageSetMainModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ImagesService {
    /**
     * Create Image
     * Creates and uploads a new image for a specified product.
     *
     * This function handles the creation of an image, including validation, uploading to a cloud
     * storage, and associating it with a product. It also ensures cache invalidation after the
     * image is successfully created.
     *
     * Args:
     * description (str, optional): The description of the image.
     * image_file (UploadFile): The image file to be uploaded.
     * product_id (int): The ID of the product to associate the image with.
     * main_image (bool): Flag indicating if the image is the main image for the product.
     * db (Session): The database session dependency.
     *
     * Raises:
     * HTTPException: If the provided data fails validation.
     * HTTPException: If the product with the given ID is not found.
     *
     * Returns:
     * Image: The created image object with the updated URL.
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
     * Remove Img Product
     * Removes an image associated with a product from both the cloud storage and the database.
     *
     * This function handles the deletion of an image by first retrieving it from the database,
     * then removing it from cloud storage, and finally deleting its record from the database.
     * It also ensures cache invalidation after the image is successfully removed.
     *
     * Args:
     * body (ImageDeletedModel): The model containing the ID of the image to be deleted.
     * db (Session): The database session dependency.
     *
     * Raises:
     * HTTPException: If the image with the given ID is not found.
     *
     * Returns:
     * None
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static removeImgProductApiImagesRemoveImgProductDelete(
        requestBody: ImageDeletedModel,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/images/remove_img_product',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Set Main Image
     * Sets a specified image as the main image for a product.
     *
     * This function updates the main image for a given product by marking the specified image
     * as the main image and ensures cache invalidation after the update.
     *
     * Args:
     * body (ImageSetMainModel): The model containing the product ID and the image ID to be set as main.
     * db (Session): The database session dependency.
     *
     * Raises:
     * HTTPException: If the image with the given ID is not found.
     * HTTPException: If the product with the given ID is not found.
     *
     * Returns:
     * List[Image]: A list of images for the product with the updated main image.
     * @param requestBody
     * @returns ImageResponse Successful Response
     * @throws ApiError
     */
    public static setMainImageApiImagesSetMainImagePatch(
        requestBody: ImageSetMainModel,
    ): CancelablePromise<Array<ImageResponse>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/images/set_main_image',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Image
     * Creates and uploads a new image for a review associated with a product.
     *
     * This function handles the creation of an image for a review, including validation,
     * uploading to a cloud storage, and associating it with a specific product and review.
     *
     * Args:
     * description (str, optional): The description of the image.
     * image_file (UploadFile): The image file to be uploaded.
     * product_id (Optional[int]): The ID of the product associated with the review.
     * review_id (int): The ID of the review to associate the image with.
     * db (Session): The database session dependency.
     *
     * Raises:
     * HTTPException: If the provided data fails validation.
     *
     * Returns:
     * Image: The created image object with the updated URL.
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
