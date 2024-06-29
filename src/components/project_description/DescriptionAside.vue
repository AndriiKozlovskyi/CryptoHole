<template>
  <h1 class="text-start mt-5 font-extrabold text-2xl text-white">Description:</h1>
  <div class="mt-3 ml-auto mr-auto rounded-lg pt-1 pl-2 text-secondary-text-color text-pretty text-base">
    <p>{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  description: String
});

</script>
