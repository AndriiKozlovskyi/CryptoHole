<template>
  <i class="pi pi-trash text-white hover:text-red-500 absolute top-5 right-5 cursor-pointer duration-300 " @click.stop="$emit('deleteEvent')" style="font-size: 1.5rem"></i>
</template>

<script setup lang="ts">
defineEmits(['deleteEvent'])
</script>