import apiClient from '@/core/api/axios'
import type { SimpleUser, User } from '../model/user.model'

/**
 * Service for managing users
 */
export const userQueryService = {
    /**
     *
     * @returns {Promise<SimpleUser[]>}
     */
    async getUsers(): Promise<SimpleUser[]> {
        const response = await apiClient.get('/user')
        return response.data
    },

    /**
     * Fetches the details of a user
     * @param {number} userId
     * @returns {Promise<User>} user details
     */
    async getUserDetails(userId: number): Promise<User> {
        const response = await apiClient.get(`/user/${userId}`)
        return response.data // Extract the data here
    },

    /**
     * Saves a new user
     * @param {User} user User data
     * @returns {Promise<User>} Created user
     */
    async createUser(user: User): Promise<User> {
        const response = await apiClient.post('/user', user)
        return response.data
    },

    /**
     * Updates an existing user
     * @param {number} userId
     * @param {User} user Updated User data
     * @returns {Promise<User>} Edited user
     */
    async updateUser(userId: number, user: User): Promise<User> {
        const response = await apiClient.put(`/user/${userId}`, user)
        return response.data
    },
}
