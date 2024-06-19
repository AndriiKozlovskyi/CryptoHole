<template>
    <div 
        :class="itemActive === true ? 'scale-[1.02] bg-primary-item-color  text-white' : 'text-[#98989d] hover:bg-hover-primary-item-color hover:text-white'"
        class="flex flex-row text-[#98989d] justify-between hover:scale-[1.02] rounded-2xl items-center text-[16px] px-4 py-3"
        @click="$router.push(`${path}`)"
    >
        <div class="flex flex-row items-center space-x-3">
            <slot></slot>
            <p>{{name}}</p>
        </div>
      
        <div class="flex flex-row justify-center items-center bg-[#101114] rounded-md">
            <p class="px-2 py-1 text-sm">{{countOfItemsInside}}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const router = useRoute();

const itemActive = computed(() => {
    console.log(props.path === router.path)
    return props.path === router.path})

const props = defineProps({
    name: {
        name: String,
        required: true,
    },
    countOfItemsInside: {
        type: Number,
        required: false,
    },
    path: {
        type: String,
        required: true,
    }
});

</script>