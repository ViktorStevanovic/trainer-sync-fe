<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import type { SimpleUser } from '../model/user.model'
import { userQueryService } from '../services/user-query.service'

const users = ref<SimpleUser[]>([])
const openDropdownId = ref<string | null>(null)
// This ref will hold an object where keys are user.email and values are the dropdown div elements
const dropdownRefs = ref<{ [key: string]: HTMLElement | null }>({})

async function fetchUsers() {
    try {
        const response = await userQueryService.getUsers()
        users.value = response as SimpleUser[]
    } catch (error) {
        console.error('Error fetching users:', error)
    }
}

function toggleDropdown(id: string) {
    openDropdownId.value = openDropdownId.value === id ? null : id
}

// Function to set the ref for each dropdown div in the dropdownRefs object
const setDropdownRef = (el: HTMLElement | null, id: string) => {
    if (el) {
        dropdownRefs.value[id] = el
    }
}

// Function to handle clicks anywhere on the document
function handleClickOutside(event: MouseEvent) {
    if (openDropdownId.value === null) {
        return // No dropdown is open, nothing to do
    }

    const clickedElement = event.target as HTMLElement
    const currentDropdownEl = dropdownRefs.value[openDropdownId.value]

    // Find the trigger element for the currently open dropdown using the data attribute
    const triggerElement = document.querySelector(`[data-dropdown-id="${openDropdownId.value}"]`)

    // Check if the click occurred inside the dropdown itself OR on its trigger element
    if (
        currentDropdownEl &&
        (currentDropdownEl.contains(clickedElement) ||
            (triggerElement && triggerElement.contains(clickedElement)))
    ) {
        // Click was inside the dropdown or on its trigger, so do not close it
        return
    }

    // If we've reached here, the click was outside the open dropdown and its trigger
    openDropdownId.value = null
}

function viewDetail(item: SimpleUser) {
    console.log('View detail for', item)
    openDropdownId.value = null
}

function editItem(item: SimpleUser) {
    console.log('Edit', item)
    openDropdownId.value = null
}

function deleteItem(item: SimpleUser) {
    console.log('Delete', item)
    openDropdownId.value = null
}

onMounted(() => {
    fetchUsers()
    // Add the global click listener when the component mounts
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    // Remove the global click listener when the component is unmounted
    document.removeEventListener('click', handleClickOutside)
})
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
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Email
                            </th>
                            <th
                                class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider"
                            ></th>
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
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-end relative"
                            >
                                <span
                                    class="cursor-pointer"
                                    @click="toggleDropdown(user.email)"
                                    :data-dropdown-id="user.email"
                                >
                                    <i class="pi pi-ellipsis-v"></i>
                                </span>

                                <div
                                    v-if="openDropdownId === user.email"
                                    :ref="(el) => setDropdownRef(el as HTMLElement, user.email)"
                                    class="right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50 fixed"
                                >
                                    <button
                                        @click="viewDetail(user)"
                                        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Detail
                                    </button>
                                    <button
                                        @click="editItem(user)"
                                        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        @click="deleteItem(user)"
                                        class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
