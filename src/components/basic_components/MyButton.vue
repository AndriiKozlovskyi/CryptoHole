<template>
    <button class="rounded-lg hover:bg-[#4619bd] px-3 py-2 font-apple bg-[#4c12b2] text-white" @click="$emit('onClick')">
        {{ text }}
    </button>
</template>
<script setup lang="ts">
defineEmits(["onClick"]);

defineProps({
  text: String,
});
</script>