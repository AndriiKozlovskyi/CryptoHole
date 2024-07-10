<template>
  <div class="flex w-full items-center flex-row rounded-lg">
    <input
      :placeholder="placeholder"
      :type="type"
      :class="$style.myinput"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      ref="input"
      class="bg-hover-primary-item-color text-[16px] apple-font rounded-lg w-full text-white px-3 py-2"
      @focusout="$emit('focusout')"
      @focusin="$emit('focusin')"
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
</style>
