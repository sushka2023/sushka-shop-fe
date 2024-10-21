/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhookMessageResponse } from '../models/WebhookMessageResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebhookService {
    /**
     * Webhook Monobank
     * @returns WebhookMessageResponse Successful Response
     * @throws ApiError
     */
    public static webhookMonobankApiWebhookMonobankPost(): CancelablePromise<WebhookMessageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/webhook/monobank',
        });
    }
}
