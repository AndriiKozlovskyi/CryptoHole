<template>
  <div class="flex w-full h-full">
    <div class="flex w-[17rem]">
      <SideMenuAdmin class="flex left-0 sticky top-0 z-[1001]" />
    </div>
    <div class="flex flex-col items-center w-full h-full overflow-auto">
      <div class="flex flex-col w-5/6 h-full">
        <TopViewAdmin class="z-[999] bg-background-color" />
        <RouterView class="mt-[12rem]"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import SideMenuAdmin from '@/components/admin_components/AdminSideMenu.vue';
import TopViewAdmin from '@/views/AdminTopView.vue';
</script>