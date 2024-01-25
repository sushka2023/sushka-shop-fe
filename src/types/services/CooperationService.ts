/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CooperationService {
    /**
     * Send Email
     * @param name
     * @param email
     * @param phoneNumber
     * @param message
     * @returns any Successful Response
     * @throws ApiError
     */
    public static sendEmailApiCooperationPost(
        name: string,
        email: string,
        phoneNumber: string = '',
        message: string = '',
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cooperation/',
            query: {
                'name': name,
                'email': email,
                'phone_number': phoneNumber,
                'message': message,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
