/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login_api_auth_login_post } from '../models/Body_login_api_auth_login_post';
import type { PasswordModel } from '../models/PasswordModel';
import type { RequestEmail } from '../models/RequestEmail';
import type { TokenModel } from '../models/TokenModel';
import type { UserModel } from '../models/UserModel';
import type { UserResponse } from '../models/UserResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Signup
     * The signup function creates a new user in the database.
     * It takes a UserModel object as input, and returns the newly created user.
     * The function also sends an email to verify the account.
     *
     * Args:
     * body: UserModel: Receive the data of the user to be created
     * background_tasks: BackgroundTasks: Add a task to the background tasks queue
     * request: Request: Get the base_url of the application
     * db: Session: Access the database
     *
     * Returns:
     * The created user
     * @param requestBody
     * @returns UserResponse Successful Response
     * @throws ApiError
     */
    public static signupApiAuthSignupPost(
        requestBody: UserModel,
    ): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Login
     * @param formData
     * @returns TokenModel Successful Response
     * @throws ApiError
     */
    public static loginApiAuthLoginPost(
        formData: Body_login_api_auth_login_post,
    ): CancelablePromise<TokenModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Logout
     * The logout function is used to logout a user.
     * It takes the credentials,
     * add access token to blacklist, and returns massage.
     *
     * Arguments:
     * credentials (HTTPAuthorizationCredentials): Get the token from the request header
     * db (Session): SQLAlchemy session object for accessing the database
     * current_user (UserModel): the current user
     *
     * Returns:
     * dict: JSON message
     * @returns any Successful Response
     * @throws ApiError
     */
    public static logoutApiAuthLogoutPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout',
        });
    }
    /**
     * Refresh Token
     * The refresh_token function is used to refresh the access token.
     * The function takes in a refresh token and returns an access_token, a new refresh_token, and the type of token.
     * If the user's current refresh_token does not match what was
     * passed into this function then it will return an error.
     *
     * Arguments:
     * credentials (HTTPAuthorizationCredentials): Get the token from the request header
     * db (Session): SQLAlchemy session object for accessing the database
     *
     * Returns:
     * dict: JSON access_token - refresh_token - token_type
     * @returns TokenModel Successful Response
     * @throws ApiError
     */
    public static refreshTokenApiAuthRefreshTokenGet(): CancelablePromise<TokenModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/refresh_token',
        });
    }
    /**
     * Confirmed Email
     * The confirmed_email function is used to confirm a user's email address.
     * It takes in the token that was sent to the user's email and uses it to get their email address.
     * Then, it gets the user from our database using their email address and checks if they are already active.
     * If they are, we return an error message saying that their account is already confirmed. Otherwise, we set them as active in our database.
     *
     * Args:
     * token: str: Get the token from the url
     * db: Session: Get the database session
     *
     * Returns:
     * A message that the email has been confirmed
     * @param token
     * @returns any Successful Response
     * @throws ApiError
     */
    public static confirmedEmailApiAuthConfirmedEmailTokenGet(
        token: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/confirmed_email/{token}',
            path: {
                'token': token,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Request Email
     * The request_email function is used to send an email to the user with a link that will allow them
     * to confirm their account. The function takes in a RequestEmail object, which contains the email of
     * the user who wants to confirm their account. It then checks if there is already an active user with
     * that email address, and if so returns a message saying that they are already confirmed. If not, it sends
     * an email containing a confirmation link.
     *
     * Args:
     * body: RequestEmail: Get the email from the request body
     * background_tasks: BackgroundTasks: Add a task to the background tasks queue
     * request: Request: Get the base url of the application
     * db: Session: Get the database session
     *
     * Returns:
     * A message that is displayed to the user
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static requestEmailApiAuthRequestEmailPost(
        requestBody: RequestEmail,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/request_email',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Send Email Reset Password
     * The send_email_reset_password function sends an email to the user with a link to reset their password.
     * The function takes in the following parameters:
     * - email (str): The user's email address.
     * - background_tasks (BackgroundTasks): A BackgroundTasks object that allows us to add tasks for execution in a separate thread. This is necessary because we don't want our API call to hang while waiting for the send_reset_email function, which can take some time, depending on how long it takes for SendGrid's servers to respond and deliver our message. We'll learn more about this later when we discuss asynchronous programming and
     *
     * Args:
     * email: str: Get the email of the user who wants to reset their password
     * background_tasks: BackgroundTasks: Run the send_reset_email function in a separate thread
     * request: Request: Get the base url of the application
     * db: Session: Get a database session
     *
     * Returns:
     * The message &quot;letter sent successfully&quot;
     * @param email
     * @returns any Successful Response
     * @throws ApiError
     */
    public static sendEmailResetPasswordApiAuthResetPasswordEmailGet(
        email: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/reset_password/{email}',
            path: {
                'email': email,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Reset Password
     * The reset_password function takes a token and a body as input.
     * The token is used to get the email of the user who requested password reset.
     * The body contains the new password for that user, which is hashed using pwd_context.hash() before being stored in
     * the database.
     *
     * Args:
     * token: str: Get the email of the user who wants to reset his password
     * body: PasswordModel: Get the password from the request body
     * db: Session: Get the database session
     *
     * Returns:
     * A message to the user
     * @param token
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static resetPasswordApiAuthResetPasswordConfirmedTokenPost(
        token: string,
        requestBody: PasswordModel,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/reset_password/confirmed/{token}',
            path: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
