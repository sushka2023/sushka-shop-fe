/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Root
     * Main page
     * @returns any Successful Response
     * @throws ApiError
     */
    public static rootGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Error Endpoint
     * @returns any Successful Response
     * @throws ApiError
     */
    public static errorEndpointErrorGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/error',
        });
    }
    /**
     * Healthchecker
     * Health Checker
     *
     * :param db: database session
     * :return: dict: health status
     * @returns any Successful Response
     * @throws ApiError
     */
    public static healthcheckerApiHealthcheckerGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/healthchecker',
        });
    }
}
