<template>
    <div class="flex flex-row items-center justify-end h-[3rem] px-3 text-secondary-text-color" @click="toggle">
        <i :class="`pi ${showAll ? 'pi-angle-down' : 'pi-angle-right'}`" />
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    showAll: Boolean,
});

const emit = defineEmits(['toggle']);

const toggle = () => emit('toggle');
</script>
