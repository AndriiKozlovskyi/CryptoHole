<template>
  <div
    class="rounded-full opacity-60 px-2 py-1 bg-hover-primary-item-color z-[1] text-white hover:opacity-100"
  >
    <p class="text-sm opacity-100">#{{ tag }}</p>
  </div>
</template>
<script setup lang="ts">
defineProps({
  tag: String
})
</script>
