<template>
    <div class="flex w-full items-center flex-row bg-primary-item-color rounded-full">
        <input
            :placeholder="placeholder"
            :type="`${isPasswordVisible ? 'text' : 'password'}`"
            :class="$style.myinput"
            @input="$emit('update:modelValue', $event.target.value)"
            :value="modelValue"
            class="bg-[#1e1f24] text-[16px] apple-font rounded-full w-full text-white px-3 py-1"
        />
        <i
            :class="`px-3 top-0 text-gray-400 ${isPasswordVisible ? 'pi pi-eye' : 'pi pi-eye-slash'}`"
            @click="togglePasswordVisibility"
        ></i>  
    </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
defineEmits(['update:modelValue'])

defineProps({
    modelValue: String,
    placeholder: String,
});

const isPasswordVisible = ref(false)

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

</script>
<style module>
.myinput {
  outline: none;
}
</style>