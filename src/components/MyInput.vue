<template>
    <div class="flex flex-col  text-white">
        <input 
        :placeholder="placeholder"
        :type="type" 
        :class="$style.myinput" 
        @input="$emit('update:modelValue', $event.target.value)"
        :value="modelValue" 
        class="bg-[#1e1f24]  rounded-lg"/>
    </div>
</template>
<script setup>
defineProps({
    placeholder: {
        type: String,
        required: false
    },
    type: String,
    modelValue: {
        type: String, Number,
        required: true
    },
})
</script>
<style module>
.myinput {
    padding: 0.05rem 1rem;
    border-width: 1px;
    outline: none;
    color: white;
    border: none;

}

.myinput:focus::-ms-input-placeholder {
    border: none;
    color: white;
}</style>