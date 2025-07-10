<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { SimpleUser } from '../model/user.model'
import { userQueryService } from '../services/user-query.service'

const users = ref<SimpleUser[]>([])

async function fetchUsers() {
    try {
        const response = await userQueryService.getUsers()
        users.value = response.data as SimpleUser[]
        console.log(response.data)
    } catch (error) {
        console.error('Errore durante il caricamento degli utenti:', error)
    }
}

onMounted(fetchUsers)
</script>

<template>
    <div class="container mx-auto px-4 sm:px-8">
        <div class="py-8">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-semibold">All Users ({{ users.length }})</h2>
                <div class="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        class="px-4 py-2 border border-gray-200 rounded-lg"
                    />
                </div>
            </div>

            <div class="overflow-x-auto rounded-lg border border-gray-200">
                <table class="min-w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Name
                            </th>
                            <!-- <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Role
                            </th> -->
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Email
                            </th>
                            <!-- <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Status
                            </th> -->
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="user in users" :key="user.email">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex flex-col">
                                    <span class="font-semibold"
                                        >{{ user.name }} {{ user.surname }}</span
                                    >
                                    <span class="text-gray-500 text-sm"
                                        >@{{ user.email.split('@')[0] }}</span
                                    >
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ user.email }}
                            </td>
                            <!-- <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="
                                        user.active
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    "
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                >
                                    {{ user.active ? 'Active' : 'Inactive' }}
                                </span>
                            </td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
