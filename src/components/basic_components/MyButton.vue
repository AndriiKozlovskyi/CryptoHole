<template>
  <button
    class="rounded-lg hover:bg-hover-purple bg-purple px-3 py-2 apple-font text-white"
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
