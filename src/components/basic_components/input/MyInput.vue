<template>
  <div class="flex w-full items-center flex-row bg-primary-item-color rounded-full">
    <input
      :placeholder="placeholder"
      :type="type"
      :class="$style.myinput"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      class="bg-[#1e1f24] text-[16px] apple-font rounded-full w-full text-white px-3 py-1"
      @focusout="$emit('focusout')"
      @focusin="$emit('focusin')"
    />
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
defineEmits(['update:modelValue', 'focusout', 'focusin'])

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
})
</script>
<style module>
.myinput {
  outline: none;
}
</style>
