/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminEmailListInput } from '../models/AdminEmailListInput';
import type { AdminEmailsResponse } from '../models/AdminEmailsResponse';
import type { PasswordChangeModel } from '../models/PasswordChangeModel';
import type { UserBlockOrRemoveModel } from '../models/UserBlockOrRemoveModel';
import type { UserChangeRole } from '../models/UserChangeRole';
import type { UserMessageResponse } from '../models/UserMessageResponse';
import type { UserResponse } from '../models/UserResponse';
import type { UserResponseAfterUpdate } from '../models/UserResponseAfterUpdate';
import type { UserResponseForCRM } from '../models/UserResponseForCRM';
import type { UserResponseForCrmWithTotalCount } from '../models/UserResponseForCrmWithTotalCount';
import type { UserUpdateData } from '../models/UserUpdateData';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Get All Users For Crm
     * Retrieves a paginated list of users for CRM purposes along with the total user count.
     *
     * This function fetches a specified number of users based on the provided limit and offset
     * from the database, and also retrieves the total count of users.
     *
     * Args:
     * limit (int): The maximum number of users to return.
     * offset (int): The number of users to skip before starting to collect the result set.
     * db (Session): The database session dependency.
     * search (str): The search string to filter users by first name, last name, or email.
     * user_id: Optional[int]: An id to filter users by their id.
     *
     * Returns:
     * UserResponseForCrmWithTotalCount: An object containing the list of users and the total count of users.
     * @param limit
     * @param offset
     * @param search
     * @param userId
     * @returns UserResponseForCrmWithTotalCount Successful Response
     * @throws ApiError
     */
    public static getAllUsersForCrmApiUsersAllForCrmGet(
        limit: number,
        offset: number,
        search?: string,
        userId?: number,
    ): CancelablePromise<UserResponseForCrmWithTotalCount> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/all_for_crm',
            query: {
                'limit': limit,
                'offset': offset,
                'search': search,
                'user_id': userId,
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
    /**
     * Change Password
     * The change_password function takes a body as input.
     * The body contains the new password for that user, which is hashed using pwd_context.hash() before being stored in
     * the database.
     *
     * Args:
     * body: PasswordChangeModel: Get the password from the request body
     * db: Session: Get the database session
     * current_user (User): the current user
     *
     * Returns:
     * A message to the user
     * @param requestBody
     * @returns UserMessageResponse Successful Response
     * @throws ApiError
     */
    public static changePasswordApiUsersMeChangePasswordPost(
        requestBody: PasswordChangeModel,
    ): CancelablePromise<UserMessageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/me/change_password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Add Email Addresses
     * Add email addresses by admin.
     *
     * Args:
     * data: AdminEmailListInput: Get the email data from the request body
     * db: Session: Get the database session
     *
     * Returns:
     * A message about successful adding of email addresses
     * @param requestBody
     * @returns UserMessageResponse Successful Response
     * @throws ApiError
     */
    public static addEmailAddressesApiUsersAdminAddressesAddEmailAddressesPost(
        requestBody: AdminEmailListInput,
    ): CancelablePromise<UserMessageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/admin_addresses/add_email_addresses',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Email Addresses
     * Obtain email addresses by admin.
     *
     * Args:
     * db: Session: Get the database session
     *
     * Returns:
     * Email addresses object
     * @returns AdminEmailsResponse Successful Response
     * @throws ApiError
     */
    public static getEmailAddressesApiUsersAdminAddressesObtainAllAddressesGet(): CancelablePromise<Array<AdminEmailsResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/admin_addresses/obtain_all_addresses',
        });
    }
    /**
     * Change Send Status
     * Changes message sending status: obtains email addresses and changes message sending status by admin.
     *
     * Args:
     * db: Session: Get the database session
     *
     * Returns:
     * A message about successful changing message sending status
     * @returns UserMessageResponse Successful Response
     * @throws ApiError
     */
    public static changeSendStatusApiUsersAdminAddressesChangeSendStatusPut(): CancelablePromise<UserMessageResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/users/admin_addresses/change_send_status',
        });
    }
}
