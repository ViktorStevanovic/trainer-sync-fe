<template>
    <div class="max-w-4xl mx-auto p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center">
                <button @click="goBack" class="p-2 rounded hover:bg-gray-100 mr-4">
                    <svg
                        class="w-6 h-6 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                <h1 class="text-2xl font-semibold text-gray-800">Appointment Details</h1>
            </div>
            <div class="flex space-x-2">
                <button
                    v-if="appointment.status === 'scheduled'"
                    @click="editAppointment"
                    class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                    Edit
                </button>
                <button
                    v-if="appointment.status === 'scheduled'"
                    @click="cancelAppointment"
                    class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="bg-white shadow rounded-lg p-6">
            <p class="text-gray-500">Loading appointment details...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6">
            <p class="text-red-800">{{ error }}</p>
        </div>

        <!-- Appointment Details -->
        <div v-else-if="appointment.id" class="space-y-6">
            <!-- Appointment Info Card -->
            <div class="bg-white shadow rounded-lg p-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-4">Appointment Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-if="appointment.availabilitySlot?.date">
                        <p class="text-xs text-gray-500 uppercase mb-1">Date</p>
                        <p class="text-lg font-medium text-gray-800">
                            {{ formatDate(appointment.availabilitySlot.date) }}
                        </p>
                    </div>
                    <div
                        v-if="
                            appointment.availabilitySlot?.startTime &&
                            appointment.availabilitySlot?.endTime
                        "
                    >
                        <p class="text-xs text-gray-500 uppercase mb-1">Time</p>
                        <p class="text-lg font-medium text-gray-800">
                            {{ appointment.availabilitySlot.startTime }} -
                            {{ appointment.availabilitySlot.endTime }}
                        </p>
                    </div>
                    <div
                        v-if="
                            appointment.availabilitySlot?.startTime &&
                            appointment.availabilitySlot?.endTime
                        "
                    >
                        <p class="text-xs text-gray-500 uppercase mb-1">Duration</p>
                        <p class="text-lg font-medium text-gray-800">
                            {{
                                calculateDuration(
                                    appointment.availabilitySlot.startTime,
                                    appointment.availabilitySlot.endTime,
                                )
                            }}
                        </p>
                    </div>
                    <div v-if="appointment.status">
                        <p class="text-xs text-gray-500 uppercase mb-1">Status</p>
                        <span
                            class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                            :class="getStatusClass(appointment.status)"
                        >
                            {{ appointment.status }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Client Information -->
            <div v-if="appointment.client" class="bg-white shadow rounded-lg p-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-4">Client Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-if="appointment.client.user">
                        <p class="text-xs text-gray-500 uppercase mb-1">Name</p>
                        <p class="text-lg font-medium text-gray-800">
                            {{ appointment.client.user.name }} {{ appointment.client.user.surname }}
                        </p>
                    </div>
                    <div v-if="appointment.client.user?.email">
                        <p class="text-xs text-gray-500 uppercase mb-1">Email</p>
                        <p class="text-lg text-gray-800">{{ appointment.client.user.email }}</p>
                    </div>
                    <div v-if="appointment.client.fitnessGoals">
                        <p class="text-xs text-gray-500 uppercase mb-1">Fitness Goals</p>
                        <p class="text-lg text-gray-800">{{ appointment.client.fitnessGoals }}</p>
                    </div>
                    <div v-if="appointment.client.medicalHistory">
                        <p class="text-xs text-gray-500 uppercase mb-1">Medical History</p>
                        <p class="text-lg text-gray-800">{{ appointment.client.medicalHistory }}</p>
                    </div>
                </div>
                <div class="mt-4 flex justify-end">
                    <button
                        @click="viewClientProfile"
                        class="text-blue-600 hover:text-blue-900 font-medium"
                    >
                        View Full Profile →
                    </button>
                </div>
            </div>

            <!-- Trainer Information -->
            <div v-if="appointment.trainer" class="bg-white shadow rounded-lg p-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-4">Trainer Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-if="appointment.trainer.user">
                        <p class="text-xs text-gray-500 uppercase mb-1">Name</p>
                        <p class="text-lg font-medium text-gray-800">
                            {{ appointment.trainer.user.name }}
                            {{ appointment.trainer.user.surname }}
                        </p>
                    </div>
                    <div v-if="appointment.trainer.user?.email">
                        <p class="text-xs text-gray-500 uppercase mb-1">Email</p>
                        <p class="text-lg text-gray-800">{{ appointment.trainer.user.email }}</p>
                    </div>
                    <div v-if="appointment.trainer.certification">
                        <p class="text-xs text-gray-500 uppercase mb-1">Certification</p>
                        <p class="text-lg text-gray-800">{{ appointment.trainer.certification }}</p>
                    </div>
                    <div v-if="appointment.trainer.hourlyRate">
                        <p class="text-xs text-gray-500 uppercase mb-1">Hourly Rate</p>
                        <p class="text-lg text-gray-800">
                            ${{ appointment.trainer.hourlyRate }}/hour
                        </p>
                    </div>
                </div>
                <div class="mt-4 flex justify-end">
                    <button
                        @click="viewTrainerProfile"
                        class="text-blue-600 hover:text-blue-900 font-medium"
                    >
                        View Full Profile →
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { appointmentQueryService } from '../services/appointment-query.service'
import type { Appointment } from '../model/appointment.model'

const route = useRoute()
const router = useRouter()
const appointmentId = Number(route.params.id)

const appointment = ref<Partial<Appointment>>({})
const loading = ref(true)
const error = ref<string | null>(null)

function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    return d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    })
}

function calculateDuration(startTime: string, endTime: string) {
    const start = new Date(`1970-01-01T${startTime}:00`)
    const end = new Date(`1970-01-01T${endTime}:00`)
    const diffMs = end.getTime() - start.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 60) {
        return `${diffMins} minutes`
    } else {
        const hours = Math.floor(diffMins / 60)
        const minutes = diffMins % 60
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
    }
}

function getStatusClass(status: string | undefined) {
    if (!status) return 'bg-gray-100 text-gray-800'

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

function goBack() {
    router.back()
}

function editAppointment() {
    router.push({ name: 'appointment-edit', params: { id: appointmentId } })
}

function cancelAppointment() {
    // Implement cancel functionality
    console.log('Cancel appointment:', appointmentId)
    // You might want to show a confirmation dialog here
}

function viewClientProfile() {
    if (appointment.value.client?.user?.id) {
        router.push({ name: 'user-detail', params: { id: appointment.value.client.user.id } })
    }
}

function viewTrainerProfile() {
    if (appointment.value.trainer?.user?.id) {
        router.push({ name: 'user-detail', params: { id: appointment.value.trainer.user.id } })
    }
}

onMounted(async () => {
    try {
        loading.value = true
        error.value = null
        const data = await appointmentQueryService.getAppointmentDetails(appointmentId)
        appointment.value = data
    } catch (err) {
        console.error('Error fetching appointment details:', err)
        error.value = 'Failed to load appointment details'
    } finally {
        loading.value = false
    }
})
</script>

<style scoped>
/* Tailwind covers most styling */
</style>
