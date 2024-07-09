<template>
  <div class="flex w-full h-full">
    <div class="flex w-[17rem]">
      <SideMenu class="flex left-0 sticky top-0" />
    </div>
    <div class="flex flex-col items-center w-full h-full overflow-auto">
      <div class="flex flex-col w-5/6 h-full">
        <TopView class="sticky top-8 z-[1001] bg-background-color" />
        <RouterView class="mt-[4rem]" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideMenu from '@/components/menu/SideMenu.vue'
import TopView from '@/views/TopView.vue'
</script>
