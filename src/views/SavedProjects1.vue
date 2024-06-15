<template>
  <div class="h-full w-full bg flex flex-col overflow-y-auto">
    <div class="flex flex-col h-full w-full items-center space-y-3 bg mt-[6rem]">
      <div class="flex flex-col h-full w-5/6 space-y-6">
        <p class="font-semibold text-2xl self-start text-white">
          Saved Projects
        </p>
        <div class="relative w-full text-white flex flex-row gap-4 overflow-y-hidden">
          <div class="flex w-1/4">
            <p>TODO</p>
          </div>
          <div class="flex w-1/4">
            <p>IN PROGRESS</p>
          </div>
          <div class="flex w-1/4">
            <p>WAITING FOR PAYMENT</p>
          </div> 
          <div class="flex w-1/4">
            <p>PAID</p>
          </div>             
        </div>
        <div class="relative w-full h-full text-white flex flex-row gap-4 overflow-y-hidden">
          <div class="flex flex-col h-full w-1/4">
            
            <DragCon v-for="project in projects" :key="project.name" :name="project.name">
                <ProjectBar class="relative h-[22.8rem]" :project="project"></ProjectBar>
              </DragCon>
              <DropZone/>
              
          </div>
          <div class="flex flex-col h-full w-1/4">
            <DropZone />
          </div>
          <div class="flex flex-col h-full w-1/4">
            <DropZone />
          </div>
          <div class="flex flex-col h-full w-1/4">
            <DropZone />
          </div>
        </div>
        <i class="fixed cursor-pointer right-4 bottom-4 text-white pi pi-question-circle" style="font-size: 2rem" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import ProjectBar from '@/components/ProjectBar1.vue';
import LocalStorageManager from '@/manager/local_storage_manager';
import { emitter } from '@/event_bus';
import DropZone from '@/components/DropZone.vue';
import DragCon from '@/components/DraggableContainer1.vue';

const projects = ref(LocalStorageManager.getSavedProject());

onBeforeMount(() => {
  emitter.on("saveProject", () => {
    projects.value = LocalStorageManager.getSavedProject();
  });
  emitter.on("unsaveProject", () => {
    projects.value = LocalStorageManager.getSavedProject();
  });
});
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
