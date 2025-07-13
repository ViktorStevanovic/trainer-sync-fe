<template>
    <div class="max-w-4xl mx-auto p-6">
        <!-- Header -->
        <div class="flex items-center mb-6">
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
            <h1 class="text-2xl font-semibold text-gray-800">User Details</h1>
        </div>

        <!-- Profile Card -->
        <div class="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row">
            <!-- Info -->
            <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                <div>
                    <p class="text-xs text-gray-500 uppercase">Name</p>
                    <p class="text-lg font-medium text-gray-800">{{ user.name }}</p>
                </div>
                <div>
                    <p class="text-xs text-gray-500 uppercase">Surname</p>
                    <p class="text-lg font-medium text-gray-800">{{ user.surname }}</p>
                </div>
                <div>
                    <p class="text-xs text-gray-500 uppercase">Email</p>
                    <p class="text-lg text-gray-800">{{ user.email }}</p>
                </div>
                <div>
                    <p class="text-xs text-gray-500 uppercase">Role</p>
                    <p class="text-lg text-gray-800">{{ user.userType?.name }}</p>
                </div>
                <div v-if="user.createdAt">
                    <p class="text-xs text-gray-500 uppercase">Joined</p>
                    <p class="text-lg text-gray-800">{{ formatDate(user.createdAt) }}</p>
                </div>
                <!-- Add more fields as needed -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userQueryService } from '../services/user-query.service'
import type { User } from '../model/user.model'

const route = useRoute()
const router = useRouter()
const userId = Number(route.params.id)

const user = ref<Partial<User>>({})

function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function goBack() {
    router.back()
}

onMounted(async () => {
    try {
        const response = await userQueryService.getUserDetails(userId)
        user.value = response
    } catch (error) {
        console.error('Error fetching user details:', error)
    }
})
</script>

<style scoped>
/* Tailwind covers most styling */
</style>
