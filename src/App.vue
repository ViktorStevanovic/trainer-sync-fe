<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarComponent from '@/components/SidebarComponent.vue'
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar only if the route does NOT have hideSidebar = true -->
    <SidebarComponent v-if="!$route.meta.hideSidebar" class="w-64" />

    <!-- Main content area -->
    <div class="flex-1 overflow-auto">
      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>
