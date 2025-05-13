<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { UserIcon, UsersIcon, CalendarDaysIcon as CalendarIcon, ArrowRightOnRectangleIcon as LogoutIcon } from '@heroicons/vue/24/outline'
import { AuthService } from '@/workarea/auth/services/auth.service';

interface User {
  id: number | null
  name: string
  surname: string
  email: string
  avatarUrl: string
}

const router = useRouter()
const user = reactive<User>({
  id: null,
  name: '',
  surname: '',
  email: '',
  avatarUrl: '',
})

onMounted(() => {
  const raw = localStorage.getItem('user')
  if (raw) {
    const u = JSON.parse(raw)
    user.id = u.id
    user.name = u.name
    user.surname = u.surname
    user.email = u.email
    user.avatarUrl = u.avatarUrl || ''
  }
})

async function handleLogout() {
  try {
    await AuthService.logout()
  } catch (err) {
    console.error('Logout failed', err)
  } finally {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push({ name: 'login' })
  }
}
</script>

<template>
  <aside
    class="flex-shrink-0 w-80 h-screen bg-gray-50 border-r border-gray-200 flex flex-col justify-between"
  >
    <div>
      <!-- logo/title -->
      <RouterLink
        to="/dashboard"
        class="flex items-center h-16 px-4 border-b border-gray-200 hover:bg-gray-100"
      >
        <h1 class="text-xl font-bold text-gray-800">Trainersync</h1>
      </RouterLink>

      <!-- profile -->
      <div class="flex items-center px-4 py-6 border-b border-gray-200">
        <img
          v-if="user.avatarUrl"
          :src="user.avatarUrl"
          alt="Avatar"
          class="w-10 h-10 rounded-full object-cover"
        />
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">
            {{ user.name }} {{ user.surname }}
          </p>
          <p class="text-xs text-gray-500">{{ user.email }}</p>
        </div>
      </div>

      <!-- menu -->
      <nav class="flex-1 overflow-y-auto px-2 py-4">
        <!-- Account section -->
        <p class="px-2 mb-2 text-xs font-semibold text-gray-400 uppercase">
          Account
        </p>
        <ul class="space-y-1">
          <li>
            <RouterLink
              :to="`/user/${user.id}`"
              class="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <UserIcon class="w-5 h-5 text-gray-500 flex-shrink-0" />
              <span class="ml-3 flex-1">Personal Settings</span>
            </RouterLink>
          </li>
        </ul>

        <!-- Workspace section -->
        <p class="mt-6 px-2 mb-2 text-xs font-semibold text-gray-400 uppercase">
          Workspace
        </p>
        <ul class="space-y-1">
          <li>
            <RouterLink
              to="/users"
              class="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <UsersIcon class="w-5 h-5 text-gray-500 flex-shrink-0" />
              <span class="ml-3 flex-1">Users</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/appointments"
              class="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <CalendarIcon class="w-5 h-5 text-gray-500 flex-shrink-0" />
              <span class="ml-3 flex-1">Appointments</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <!-- logout -->
    <div class="px-4 py-4 border-t border-gray-200">
      <button
        @click="handleLogout"
        class="w-full flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
      >
        <LogoutIcon class="w-5 h-5 text-gray-500 flex-shrink-0" />
        <span class="ml-3">Logout</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
/* styling via Tailwind */
</style>
