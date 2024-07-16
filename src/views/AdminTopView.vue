<template>
    <div class="fixed grid grid-rows-2 grid-flow-col w-full justify-between py-3 h-[12rem]">
      <div class="col-span-2 text-white text-[30px] font-semibold">
        {{ capitalizedName }}
      </div>
      <div class="">
        <TabMenuAdmin />
      </div>
      <div class="row-span-2 text-white">
        <ProfileImage />
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import TabMenuAdmin from '@/components/admin_components/AdminTabMenu.vue';
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import ProfileImage from '@/components/header/ProfileImage.vue'
  
  const router = useRoute()
  const capitalizedName = computed(() => {
    const routeName = router.matched[1].name || ''
    return routeName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  })
  </script>
  