<template>
    <input type="text" :class="$style.myinput" class="rounded-full items-color w-1/2 bg-[#494545]" placeholder="Search" />
</template>
<script setup lang="ts">
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