import apiClient from '@/core/api/axios'
import type { Appointment } from '../model/appointment.model'

/**
 * Service for managing appointments
 */
export const appointmentQueryService = {
    /**
     * Fetches the list of appointments
     * @returns {Promise<Appointment[]>}
     */
    async getAppointments(): Promise<Appointment[]> {
        const response = await apiClient.get('/appointment')
        return response.data
    },

    /**
     * Fetches the details of a appointment
     * @param {number} appointmentId
     * @returns {Promise<Appointment>} appointment details
     */
    async getAppointmentDetails(appointmentId: number): Promise<Appointment> {
        const response = await apiClient.get(`/appointment/${appointmentId}`)
        return response.data // Extract the data here
    },

    /**
     * Saves a new appointment
     * @param {Appointment} appointment Appointment data
     * @returns {Promise<Appointment>} Created appointment
     */
    async createAppointment(appointment: Appointment): Promise<Appointment> {
        const response = await apiClient.post('/appointment', appointment)
        return response.data
    },

    /**
     * Updates an existing appointment
     * @param {number} appointmentId
     * @param {Appointment} appointment Updated Appointment data
     * @returns {Promise<Appointment>} Edited appointment
     */
    async updateAppointment(appointmentId: number, appointment: Appointment): Promise<Appointment> {
        const response = await apiClient.put(`/appointment/${appointmentId}`, appointment)
        return response.data
    },
}
