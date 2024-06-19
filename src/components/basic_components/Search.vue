<template>
    <div class="flex items-center bg-primary-item-color rounded-full">
        <i class="pi pi-search text-white ml-4"/>
        <MyInput/>
    </div>
</template>
<script setup lang="ts">
import MyInput from './MyInput.vue';
defineProps({
    modelValue: {
        type: [String, Number],
        required: true
    },
});
</script>
