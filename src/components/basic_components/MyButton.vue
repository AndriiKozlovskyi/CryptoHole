<template>
    <button class="rounded-full hover:bg-hover-primary-item-color px-3 py-2 bg-primary-item-color text-white" @click="$emit('onClick')">
        {{ text }}
    </button>
</template>
<script setup lang="ts">
defineEmits(["onClick"]);

defineProps({
  text: String,
});
</script>