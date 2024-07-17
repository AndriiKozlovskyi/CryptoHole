<template>
    <div class="flex w-full items-center flex-row bg-primary-item-color rounded-full">
      <input
        :placeholder="placeholder"
        type="text"
        :class="$style.myinput"
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue"
        class="bg-[#1e1f24] text-[16px] apple-font rounded-full w-full text-white px-3 py-1"
        @focusin="$emit('focusin')"
      />
    </div>
  </template>
  <script setup lang="ts">
  defineEmits(['update:modelValue', 'focusin'])
  
  defineProps({
    modelValue: String,
    placeholder: String
  })
    
  </script>
  <style module>
  .myinput {
    outline: none;
  }
  </style>
  