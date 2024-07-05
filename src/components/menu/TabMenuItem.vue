<template>
  <div 
    :class="
      itemActive
      ? 'text-white relative'
      : 'text-secondary-text-color hover:bg-[#4c12b2] hover:text-white hover:scale-[1.02]'
    "
    class="flex flex-row justify-between items-center text-[16px] px-4 py-3 cursor-pointer"
    @click="$router.push(`${path}`)"
  >
    <div class="flex flex-row items-center space-x-3">
      <slot></slot>
      <p>{{ name }}</p>
    </div>
    <div v-if="itemActive" class="absolute bottom-0 left-0 w-full h-[2px] rounded-lg bg-white"></div>
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
  const itemActive = computed(() => {
		console.log(props.path + " " + router.fullPath)
		if(props.path === router.fullPath) {
			return true;
		} return false;
		})
</script>