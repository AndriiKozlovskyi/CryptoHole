<template>
  <div
    class="flex bg-primary-item-color h-[100%] rounded-md flex-col w-min"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="flex flex-row items-center text-secondary-text-color justify-between p-3">
      <p class="text-[14px] apple-font">{{ name }}</p>
      <p>{{ amountOfProjects }}</p>
    </div>
    <DropZone :id="id" />
  </div>
</template>
<script setup>
import DropZone from '@/components/draggable_containers/DropZone.vue'
import { ref } from 'vue'

const hovered = ref(false)

defineProps({
  name: String,
  id: String,
  amountOfProjects: Number
})
</script>
