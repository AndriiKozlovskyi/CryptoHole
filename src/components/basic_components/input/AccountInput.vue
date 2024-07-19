<template>
    <div class="flex items-center flex-row w-[7rem]">
      <input
        :placeholder="placeholder"
        :type="type"
        :class="$style.myinput"
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue"
        ref="input"
        class="bg-transparent border-b border-white text-[16px] apple-font w-full text-white px-3 py-2"
        @focusout.self="$emit('focusout')"
        @focusin.self="$emit('focusin')"
      />
      <slot></slot>
    </div>
  </template>
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  
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
  const input = ref(null);
  
  defineExpose({
    focus: () => {
      input.value.focus();
    }
  });

  onMounted(() => {
    input.value.focus();
})
  </script>
  <style module>
  .myinput {
    outline: none;
  }
  
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  </style>
  