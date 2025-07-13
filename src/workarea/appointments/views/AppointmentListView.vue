<template>
    <div class="max-w-7xl mx-auto p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-semibold text-gray-800">Appointments</h1>
            <button
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
                New Appointment
            </button>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="bg-white shadow rounded-lg p-6">
            <p class="text-gray-500">Loading appointments...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6">
            <p class="text-red-800">{{ error }}</p>
        </div>

        <!-- Empty state -->
        <div
            v-else-if="appointments.length === 0"
            class="bg-white shadow rounded-lg p-6 text-center"
        >
            <p class="text-gray-500">No appointments found.</p>
        </div>

        <!-- Appointments List -->
        <div v-else class="bg-white shadow rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Date & Time
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Client
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Trainer
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Status
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr
                        v-for="appointment in appointments"
                        :key="appointment.id"
                        class="hover:bg-gray-50 cursor-pointer transition-colors"
                        @click="viewAppointment(appointment.id)"
                    >
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">
                                {{ formatDate(appointment.availabilitySlot.date) }}
                            </div>
                            <div class="text-sm text-gray-500">
                                {{ appointment.availabilitySlot.startTime }} -
                                {{ appointment.availabilitySlot.endTime }}
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">
                                {{ appointment.client.user.name }}
                                {{ appointment.client.user.surname }}
                            </div>
                            <div class="text-sm text-gray-500">
                                {{ appointment.client.user.email }}
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">
                                {{ appointment.trainer.user.name }}
                                {{ appointment.trainer.user.surname }}
                            </div>
                            <div
                                class="text-sm text-gray-500"
                                v-if="appointment.trainer.certification"
                            >
                                {{ appointment.trainer.certification }}
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span
                                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                                :class="getStatusClass(appointment.status)"
                            >
                                {{ appointment.status }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                                @click.stop="viewAppointment(appointment.id)"
                                class="text-blue-600 hover:text-blue-900 mr-4"
                            >
                                View
                            </button>
                            <button
                                @click.stop="editAppointment(appointment.id)"
                                class="text-green-600 hover:text-green-900 mr-4"
                                v-if="appointment.status === 'scheduled'"
                            >
                                Edit
                            </button>
                            <button
                                @click.stop="cancelAppointment(appointment.id)"
                                class="text-red-600 hover:text-red-900"
                                v-if="appointment.status === 'scheduled'"
                            >
                                Cancel
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { appointmentQueryService } from '../services/appointment-query.service'
import type { Appointment } from '../model/appointment.model'

const router = useRouter()

const appointments = ref<Appointment[]>([])

const loading = ref(true)
const error = ref<string | null>(null)

function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    return d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
    })
}

function getStatusClass(status: string) {
    switch (status) {
        case 'scheduled':
            return 'bg-blue-100 text-blue-800'
        case 'completed':
            return 'bg-green-100 text-green-800'
        case 'canceled':
            return 'bg-red-100 text-red-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

function viewAppointment(appointmentId: number) {
    router.push({ name: 'appointment-detail', params: { id: appointmentId } })
}

function editAppointment(appointmentId: number) {
    router.push({ name: 'appointment-edit', params: { id: appointmentId } })
}

function cancelAppointment(appointmentId: number) {
    // Implement cancel functionality
    console.log('Cancel appointment:', appointmentId)
    // You might want to show a confirmation dialog here
}

async function fetchAppointments() {
    try {
        loading.value = true
        error.value = null
        const data = await appointmentQueryService.getAppointments()

        appointments.value = data
    } catch (err) {
        console.error('Error fetching appointments:', err)
        error.value = 'Failed to load appointments'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchAppointments()
})
</script>

<style scoped>
/* Tailwind covers most styling */
</style>
