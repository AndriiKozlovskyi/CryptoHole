<template>
    <div class="flex flex-col h-[10rem]">
      <div class="w-[5rem] flex flex-row space-x-2">
        <TabMenuItem name="Events" path="/admin/event_management" />
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import TabMenuItem from '../menu/TabMenuItem.vue';
  </script>
  