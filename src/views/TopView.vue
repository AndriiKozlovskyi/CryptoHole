<template>
  <div class="grid grid-rows-2 grid-flow-col justify-between h-[12rem]">
    <div class="col-span-2 text-white text-[30px] font-semibold">
      {{ capitalizedName }}
    </div>
    <div class="col-span-2">
      <TabMenu />
    </div>
    <div class="row-span-2 text-white">
      <ProfileImage />
    </div>
  </div>
</template>
<script setup lang="ts">
import TabMenu from '@/components/menu/TabMenu.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProfileImage from '@/components/header/ProfileImage.vue'

const router = useRoute()
const capitalizedName = computed(() => {
  const routeName = router.matched[0].name || ''
  return routeName.charAt(0).toUpperCase() + routeName.slice(1)
})
</script>
