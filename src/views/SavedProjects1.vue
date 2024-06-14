<template>
  <div class="h-full w-screen bg flex flex-col overflow-y-auto">
    <div class="flex flex-col h-full items-center space-y-3 bg mt-[6rem]">
      <div class="flex h-full flex-col space-y-6">
        <p class="font-semibold text-2xl self-start text-white">
          Saved Projects
        </p>
        <div class="relative w-screen h-full grid grid-cols-3 gap-4 overflow-y-hidden">
              
          <div v-for="project in projects" :key="project.name">
            <DragCon :name="project.name">
              <ProjectBar class="relative" :project="project"> </ProjectBar>
            </DragCon>
          </div>
    
          <div class="flex flex-row space-x-4 h-[22.8rem] rounded-lg border-white border hover:bg-[#1E1F24] justify-center items-center">
            <i class="pi pi-plus text-white"/>
            <p class="text-white">Add My Project</p>
          </div>
        </div>
        <i class="fixed cursor-pointer right-4 bottom-4 text-white pi pi-question-circle" style="font-size:2rem"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import ProjectBar from '@/components/ProjectBar1.vue';
import LocalStorageManager from '@/manager/local_storage_manager';
import { emitter } from '@/event_bus';
// import DraggableContainer from '@/components/DraggableContainer.vue'
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