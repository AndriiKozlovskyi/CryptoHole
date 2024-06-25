<template>
  <div class="h-full flex flex-col overflow-y-auto">
    <div class="flex flex-col items-center mt-[6rem]">
      <div class="flex flex-col items-center space-y-6">
        <p class="font-semibold text-2xl self-start text-white">New Projects</p>
        <ProjectsContainer />
        <HelpButton />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ProjectsContainer from '@/components/project_components/ProjectsContainer.vue'
import HelpButton from '@/components/HelpButton.vue'
import ProjectApi from "@/api/project_api";
import { onMounted } from 'vue';

onMounted(() => {
});
</script>
<style>
.main-view {
  height: 100%;
}
</style>
