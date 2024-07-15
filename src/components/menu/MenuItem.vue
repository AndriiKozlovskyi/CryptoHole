<template>
  <div
    :class="
      itemActive === true
        ? 'bg-primary-item-color text-white'
        : 'text-secondary-text-color hover:bg-hover-purple hover:text-white hover:scale-[1.02]'
    "
    class="flex flex-row justify-between items-center text-[16px] px-4 py-3 cursor-pointer"
    @click="$router.push(`${path}`)"
  >
    <div class="flex flex-row items-center space-x-3">
      <slot class="text-purple-500"></slot>
      <p>{{ name }}</p>
    </div>
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
  path: {
    type: String,
    required: true
  }
})

const router = useRoute()
const _path = computed(() => router.matched[0].name) //[0] first one

const itemActive = computed(() => {
  if (props.path === _path.value) {
    return true
  }
  return false
})
</script>
