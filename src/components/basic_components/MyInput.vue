<template>
    <div class="flex">
        <input 
        :placeholder="placeholder"
        :type="type" 
        :class="$style.myinput" 
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue" 
        class="bg-[#1e1f24] rounded-full w-full text-white px-3 py-1"
        />
    </div>
</template>
<script setup lang="ts">
defineProps({
    placeholder: {
        type: String,
        required: false
    },
    modelValue: {
        type: [String, Number],
        required: false
    },
})
</script>
<style module>
.myinput {
    outline: none;
}
</style>