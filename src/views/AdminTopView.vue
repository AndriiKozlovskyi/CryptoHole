<template>
    <div class="fixed grid grid-rows-2 grid-flow-col w-full justify-between py-3 h-[12rem]">
      <div class="col-span-2 text-white text-[30px] font-semibold">
        {{ capitalizedName }}
      </div>
      <div class="">
        <AdminTabMenu />
      </div>
      <div class="row-span-2 text-white">
        <ProfileImage />
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import AdminTabMenu from '@/components/admin_components/AdminTabMenu.vue';
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import ProfileImage from '@/components/header/ProfileImage.vue'
  
  const route = useRoute()
  const capitalizedName = computed(() => {
    const routeName = route.matched[0].name || ''
    if(route.path.includes('admin/event_management')) {
      return "Event Management"
    }
    return routeName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  })
  </script>
  