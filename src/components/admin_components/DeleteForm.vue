<template>
  <button class="pi pi-trash text-white text-xl hover:text-red-500 duration-300" @click.stop="$emit('deleteEvent')" ></button>
</template>

<script setup lang="ts">
defineEmits(['deleteEvent'])
</script>