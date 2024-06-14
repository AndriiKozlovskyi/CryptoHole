<template>
    <div class="h-full bg flex flex-col overflow-y-auto">
      <div class="flex flex-col items-center space-y-3 bg mt-[6rem]">
        <div class="flex flex-col space-y-6">
          <p class="font-semibold text-2xl self-start text-white">
            Saved Projects
          </p>
          <div class="relative w-[56rem] grid grid-cols-3 gap-4 overflow-y-hidden">
            <div v-for="project in projects" :key="project.name">
              <DragCon :name="project.name" :dropZonesCount="dropZonesCount" :elementWidth="elementWidth" :elementHeight="elementHeight">
                <ProjectBar class="relative h-[22.8rem]" :project="project"></ProjectBar>
              </DragCon>
            </div>
  
            <DropZone />
  
            <div class="flex flex-row space-x-4 h-[22.8rem] rounded-lg border-white border hover:bg-[#1E1F24] justify-center items-center">
              <i class="pi pi-plus text-white" />
              <p class="text-white">Add My Project</p>
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
  const dropZonesCount = 10;
  const elementWidth = '18rem';
  const elementHeight = '22.8rem';
  const isDragging = ref(false);
  
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
  