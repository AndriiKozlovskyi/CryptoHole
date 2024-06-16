<template>
    <div class="h-full bg flex flex-col overflow-y-auto">
       
        <div class="flex flex-col items-center space-y-3 bg mt-[6rem]">
            <div class="flex flex-col items-center space-y-6">
                <p class="font-semibold text-2xl self-center text-white">New Projects</p>
                <HelloPage/>
                <i class="fixed cursor-pointer right-4 bottom-4 text-white pi pi-question-circle" style="font-size:2rem"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import HelloPage from '@/components/HelloPage.vue';

</script>
<style>
.main-view {
  height: 100%;
}
</style>
