<template>
    <div class="flex w-full items-center flex-row bg-hover-primary-item-color rounded-lg">
    <i class="pi pi-link ml-1 text-blue-400 absolute"/>
      <input
        :placeholder="placeholder"
        :type="type"
        :class="$style.myinput"
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue"
        ref="input"
        class="ml-3 bg-hover-primary-item-color text-[16px] apple-font rounded-lg w-[10rem] text-white px-3 py-1"
        @focusout.self="$emit('focusout')"
        @focusin.self="$emit('focusin')"
      />
      <slot></slot>
    </div>
  </template>
  <script setup lang="ts">
  import { ref } from 'vue';
  
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
  