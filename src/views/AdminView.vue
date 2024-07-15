<template>
    <div class="h-full flex flex-col">
      <div class="flex flex-col items-center">
        <div class="flex flex-col w-full items-center space-y-6">
          <AdminEventsContainer />
          <HelpButton />
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import AdminEventsContainer from '@/components/admin_components/AdminEventsContainer.vue';
  import HelpButton from '@/components/HelpButton.vue'
  </script>
  <style>
  .main-view {
    height: 100%;
  }
  </style>
  