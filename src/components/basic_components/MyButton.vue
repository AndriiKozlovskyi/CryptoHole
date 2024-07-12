<template>
  <button
    class="rounded-lg hover:bg-[#4619bd] bg-[#4c12b2] px-3 py-2 apple-font text-white"
    @click="$emit('onClick')"
  >
    {{ text }}
  </button>
</template>
<script setup lang="ts">
defineEmits(['onClick'])

defineProps({
  text: String
})
</script>
