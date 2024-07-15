<template>
  <div class="flex flex-row items-center bg-hover-primary-item-color px-4 rounded-full">
    <i class="pi pi-search text-white" />
    <MyInput placeholder="Search" />
  </div>
</template>
<script setup lang="ts">
import MyInput from './MyInput.vue'
defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  }
})
</script>
