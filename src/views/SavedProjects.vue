<template>
    <div class="h-full bg flex flex-col overflow-y-auto">
      <div class="flex flex-col items-center space-y-3 bg mt-[6rem]">
        <div class="flex flex-col space-y-6">
          <p class="font-semibold text-2xl self-start text-white">
            Saved Projects
          </p>
          <div class="relative w-full grid grid-cols-3 gap-4 overflow-y-hidden">
            <div v-for="project in projects" :key="project.name">
              <DragCon :name="project.name" :dropZonesCount="dropZonesCount" :elementWidth="elementWidth" :elementHeight="elementHeight">
                <ProjectBar class="relative h-[22.8rem]" :project="project"></ProjectBar>
              </DragCon>
            </div>
  
            <DropZone />
  
            <div class="relative mr-4 flex flex-row py-3 px-3 items-center space-x-3 bottom-2 cursor-pointer rounded-lg ml-4 bg-[#181a1d]">
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
  import ProjectBar from '@/components/ProjectBar.vue';
  import LocalStorageManager from '@/manager/local_storage_manager';
  import { emitter } from '@/event_bus';
  import DropZone from '@/components/DropZone.vue';
  import DragCon from '@/components/DraggableContainer.vue';
  
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
  