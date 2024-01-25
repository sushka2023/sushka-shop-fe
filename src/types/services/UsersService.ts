/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserBlockOrRemoveModel } from '../models/UserBlockOrRemoveModel';
import type { UserChangeRole } from '../models/UserChangeRole';
import type { UserResponse } from '../models/UserResponse';
import type { UserResponseAfterUpdate } from '../models/UserResponseAfterUpdate';
import type { UserResponseForCRM } from '../models/UserResponseForCRM';
import type { UserUpdateData } from '../models/UserUpdateData';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Get All Users For Crm
     * The function returns a list of all users in the database.
     *
     * Args:
     * limit: int: Limit the number of users returned
     * offset: int: Specify the offset of the first user to be returned
     * db: Session: Access the database
     *
     * Returns:
     * A list of users
     * @param limit
     * @param offset
     * @returns UserResponseForCRM Successful Response
     * @throws ApiError
     */
    public static getAllUsersForCrmApiUsersAllForCrmGet(
        limit: number,
        offset: number,
    ): CancelablePromise<Array<UserResponseForCRM>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/all_for_crm',
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
     * Read Users Me
     * The read_users_me function is a GET request that returns the current user's information.
     * It requires authentication, and it uses the auth_service to get the current user.
     *
     * Arguments:
     * current_user (User): the current user attempting to delete the comment
     *
     * Returns:
     * User: The current user object
     * @returns UserResponse Successful Response
     * @throws ApiError
     */
    public static readUsersMeApiUsersMeGet(): CancelablePromise<UserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/me/',
        });
    }
    /**
     * Update Current User
     * Change the data of the current_user
     *
     * Arguments:
     * user_data (UserUpdateData): object with updated user data
     * current_user (User): the current user
     * db (Session): SQLAlchemy session object for accessing the database
     *
     * Returns:
     * User: object after the change operation
     * @param requestBody
     * @returns UserResponseAfterUpdate Successful Response
     * @throws ApiError
     */
    public static updateCurrentUserApiUsersMePut(
        requestBody: UserUpdateData,
    ): CancelablePromise<UserResponseAfterUpdate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/users/me/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Change Role
     * Change the role of a user
     *
     * Arguments:
     * body (UserChangeRole): object with new role
     * user (User): the current user
     * db (Session): SQLAlchemy session object for accessing the database
     *
     * Returns:
     * User: object after the change operation
     * @param requestBody
     * @returns UserChangeRole Successful Response
     * @throws ApiError
     */
    public static changeRoleApiUsersChangeRolePut(
        requestBody: UserChangeRole,
    ): CancelablePromise<UserChangeRole> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/users/change_role',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Block User
     * The block_user function blocks a user.
     *
     * Args:
     * user: UserBlockOrRemoveModel: Get the id of the user to block and changed status of field is_blocked
     * db: Session: Access the database
     *
     * Returns:
     * A user blocked model object
     * @param requestBody
     * @returns UserResponseForCRM Successful Response
     * @throws ApiError
     */
    public static blockUserApiUsersBlockUserPut(
        requestBody: UserBlockOrRemoveModel,
    ): CancelablePromise<UserResponseForCRM> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/users/block_user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Unblock User
     * The unblock_user function unblocks a user.
     *
     * Args:
     * user: UserBlockOrRemoveModel: Get the id of the user to unblock and changed status of field is_blocked
     * db: Session: Access the database
     *
     * Returns:
     * A user unblocked model object
     * @param requestBody
     * @returns UserResponseForCRM Successful Response
     * @throws ApiError
     */
    public static unblockUserApiUsersUnblockUserPut(
        requestBody: UserBlockOrRemoveModel,
    ): CancelablePromise<UserResponseForCRM> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/users/unblock_user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Remove User
     * The remove_user function deletes a user.
     *
     * Args:
     * user: UserBlockOrRemoveModel: Get the id of the user to delete and changed status of field is_deleted
     * db: Session: Access the database
     *
     * Returns:
     * A user deleted model object
     * @param requestBody
     * @returns UserResponseForCRM Successful Response
     * @throws ApiError
     */
    public static removeUserApiUsersRemoveUserPut(
        requestBody: UserBlockOrRemoveModel,
    ): CancelablePromise<UserResponseForCRM> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/users/remove_user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Return User
     * The return_user function returns a user.
     *
     * Args:
     * user: UserBlockOrRemoveModel: Get the id of the user to return
     * and changed status of fields is_deleted and is_blocked
     * db: Session: Access the database
     *
     * Returns:
     * A user returned model object
     * @param requestBody
     * @returns UserResponseForCRM Successful Response
     * @throws ApiError
     */
    public static returnUserApiUsersReturnUserPut(
        requestBody: UserBlockOrRemoveModel,
    ): CancelablePromise<UserResponseForCRM> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/users/return_user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
