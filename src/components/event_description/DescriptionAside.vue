<template>
  <h1 class="text-start mt-5 font-extrabold text-2xl text-white">Description:</h1>
  <p
    class="mt-3 ml-auto mr-auto rounded-lg pt-1 pl-2 text-pretty text-base text-secondary-text-color"
  >
    {{ description }}
  </p>
</template>

<script setup lang="ts">
defineProps({
  description: String
})
</script>
