<template>
    <div class="flex flex-row">
        <i v-if="condition" class="pi pi-bookmark-fill text-white" style="font-size: 1.5rem;" @click.stop="$emit('unsave')"></i>
        <i v-if="!condition" class="pi pi-bookmark  text-white" style="font-size: 1.5rem;" @click.stop="$emit('save')"></i>
    </div>
</template>
<script setup lang="ts">
defineProps({
    condition: Boolean
});

defineEmits(['save', 'unsave']);
</script>