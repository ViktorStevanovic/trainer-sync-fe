<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Main Content Area -->
      <main class="py-10 px-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <!-- Placeholder for dashboard content -->
        <div class="bg-white shadow rounded-lg p-6">
          <p class="text-gray-600">Welcome, {{ user?.name }}!</p>
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  interface UserInfo {
    id: number;
    name: string;
    surname: string;
    email: string;
    userType: string;
  }
  
  const router = useRouter();
  const user = ref<UserInfo | null>(null);
  
  // Load user from localStorage
  onMounted(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        user.value = JSON.parse(stored) as UserInfo;
        // Optionally, you can also load token
        const token = localStorage.getItem('token');
        if (!token) {
          router.push({ name: 'login' });
        }
      } catch {
        router.push({ name: 'login' });
      }
    } else {
      router.push({ name: 'login' });
    }
  });
  </script>
  
  <style scoped>
  /* Scoped minimal styling */
  </style>
  