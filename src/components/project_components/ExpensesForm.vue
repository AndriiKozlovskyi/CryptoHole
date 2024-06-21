<template>
  <div class="flex flex-row space-x-2 items-center">
    <i class="pi pi-wallet text-secondary-text-color" />
    <p class="text-[14px] text-white">{{ expenses }}$</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  expenses: Number
})
</script>
