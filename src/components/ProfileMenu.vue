<template>
    <div class="absolute px-4 py-3 cursor-pointer space-y-2 font flex flex-col font-lg right-0 top-[5rem] rounded-xl">
        <div class="text-white rounded-2xl text-[16px] hover:bg-[#28292e] px-4 py-3">
            <i class="pi pi-user"></i>
            My Profile
        </div>
        <div 
            class="text-white rounded-2xl text-[16px] hover:bg-[#28292e] px-4 py-3"
            @click="$router.push('/saved_projects')"
        >
            <i class="pi pi-bookmark-fill"></i>
            Saved Project
        </div>
    </div>
</template>
<script setup lang="ts">

</script>
<style>
</style>