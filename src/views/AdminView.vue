<template>
  <Toast />
  <div class="h-full flex flex-col overflow-y-auto">
    <div class="flex flex-col items-center mt-[6rem]">
      <div class="flex flex-col items-center space-y-6">
        <p class="font-semibold text-2xl self-start text-white">All Projects</p>
        <div class="flex flex-row space-x-4">
          <AdminProjectContainer />
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminProjectContainer from '@/components/admin_components/AdminProjectContainer.vue'
</script>
