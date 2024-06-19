<template>
    <div class="flex flex-col text-white px-4 py-1">
        <input 
        :placeholder="placeholder"
        :type="type" 
        :class="$style.myinput" 
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue" 
        class="bg-[#1e1f24]  rounded-lg"
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