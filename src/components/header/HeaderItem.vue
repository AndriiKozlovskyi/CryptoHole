<template>
  <p
    class="text-white hover:text-secondary-text-color cursor-pointer py-4"
    @click="$emit('onClick')"
  >
    {{ name }}
  </p>
</template>
<script setup lang="ts">
defineProps({
  name: String
})

defineEmits(['onClick'])
</script>
