<template>
        <button class="pi pi-pencil text-white text-xl hover:text-blue-500 duration-300" @click.stop="$emit('updateEvent')"></button>
</template>
<script setup lang="ts">
defineEmits(['updateEvent'])
</script>