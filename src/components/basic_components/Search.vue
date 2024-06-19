<template>
    <div class="flex items-center w-2/3 bg-[#1e1f24] px-3 rounded-full">
        <i class="pi pi-search text-white p-2"/>
        <MyInput/>
    </div>
</template>
<script setup lang="ts">
import MyInput from './MyInput.vue';
defineProps({
    modelValue: {
        type: [String, Number],
        required: true
    },
});
</script>

<style module>
.myinput {
    padding: 0.5rem 2rem;
    border-width: 1px;
    outline: none;
    color: white;
    border: none;

}

.myinput:focus::-ms-input-placeholder {
    border: none;
    color: white;
}

</style>