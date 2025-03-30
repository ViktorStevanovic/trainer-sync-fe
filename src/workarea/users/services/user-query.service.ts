import apiClient from '@/core/api/axios';
import type { User } from '../model/user.model';

/**
 * Service for managing users
 */
export const userQueryService = {

    /**
     * Fetches the list of users
     * @returns
     */
    getUsers() {
        return apiClient.get('/user');
    },

    /**
     * Fetches the details of a user
     * @param {number} userId
     * @returns {Promise<User>} user details
     */
    getUserDetails(userId: number) {
        return apiClient.get(`/user/${userId}`);
    },

    /**
     * Saves a new user
     * @param {Object} user User data
     * @returns {Promise<User>} Created user
     */
    createUser(user: number) {
        return apiClient.post('/user', user);
    },

    /**
     * Updates an existing user
     * @param {number} userId
     * @param {Object} user Updated User data
     * @returns {Promise<User>} Edited user
     */
    updateUser(userId: number, user: User) {
        return apiClient.put(`/user/${userId}`, user);
    },

};
