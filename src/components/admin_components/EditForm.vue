<template>
        <button class="pi pi-pencil text-white text-xl absolute right-5 top-2 hover:text-blue-500 duration-300" @click.stop="$emit('updateProject')"></button>
</template>
<script setup lang="ts">
defineEmits(['updateProject'])
</script>