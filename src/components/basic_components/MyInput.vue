<template>
  <div class="flex">
    <input
      :placeholder="placeholder"
      :type="type"
      :class="$style.myinput"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      class="bg-[#1e1f24] text-[16px] apple-font rounded-full w-full text-white px-3 py-1"
    />
  </div>
</template>
<script setup lang="ts">
defineEmits(['update:modelValue'])

defineProps({
  placeholder: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false,
    default: 'text'
  },
  modelValue: {
    type: [String, Number],
    required: false
  }
});
</script>
<style module>
.myinput {
  outline: none;
}
</style>
