<template>
  <div
    :class="
      itemActive === true
        ? 'scale-[1.02] bg-primary-item-color text-white'
        : 'text-secondary-text-color hover:bg-hover-primary-item-color hover:text-white'
    "
    class="flex flex-row justify-between hover:scale-[1.02] rounded-lg items-center text-[16px] px-4 py-3 cursor-pointer"
    @click="$router.push(`${path}`)"
  >
    <div class="flex flex-row items-center space-x-3">
      <slot></slot>
      <p>{{ name }}</p>
    </div>
    <p class="text-sm">{{ countOfItemsInside }}</p>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  name: {
    name: String,
    required: true
  },
  countOfItemsInside: {
    type: Number,
    required: false
  },
  path: {
    type: String,
    required: true
  }
})

const router = useRoute()
const itemActive = computed(() => props.path === router.path)
</script>
