<template>
  <div
    class="flex bg-primary-item-color h-[100%] rounded-md flex-col w-min"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >    <div class="flex flex-row items-center text-secondary-text-color justify-between p-3">
      <p class="text-[14px] apple-font">{{ name }}</p>
      <p>{{ amountOfProjects }}</p>
    </div>
    <DragCon class="" v-for="project in projects" :key="project.name" :name="project.name">
      <ProjectBar @drag-switch="dragSwitch()" :project="project"></ProjectBar>
    </DragCon>

    
    <DropZone :id="id" />
  </div>
</template>
<script setup>
import DropZone from '@/components/draggable_containers/DropZone.vue'
import ProjectBar from '@/components/project_components/SavedProject.vue'
import DragCon from '@/components/draggable_containers/DraggableContainer.vue'
import { computed, ref, provide } from 'vue'
import LocalStorageManager from '@/manager/local_storage_manager';

const hovered = ref(false)

const props = defineProps({
  name: String,
  id: String,
  projects: Array,
  amountOfProjects: Number
});
const isDragAvailable = ref(true)
provide('dragAvailable', isDragAvailable)

const dragSwitch = () => {
  console.log(isDragAvailable.value)

  isDragAvailable.value = !isDragAvailable.value
}

</script>
