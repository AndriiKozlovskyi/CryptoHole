<template>
    <td :class="`px-2 py-2 ${clearIncome < 0 ? 'bg-opacity-15 bg-red-500' : 'bg-opacity-20 bg-green-700'}`">
        <div class="flex flex-row space-x-4 items-center justify-between">
            <p class="text-[16px] px-2 py-1 rounded-lg text-white font-apple">{{ clearIncome }} $</p>
        </div>
    </td>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    clearIncome: Number,
});
</script>
