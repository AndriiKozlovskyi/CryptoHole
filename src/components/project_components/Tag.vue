<template>
  <div
    class="rounded-full opacity-80 px-3 py-1 bg-hover-primary-item-color text-white hover:opacity-100"
  >
    <p class="opacity-100">#{{ tag }}</p>
  </div>
</template>
<script setup lang="ts">
defineProps({
  tag: String
})
</script>
