<template>
  <div
    class="flex bg-primary-item-color h-[100%] rounded-md flex-col w-min"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="flex flex-row items-center text-secondary-text-color justify-between p-3">
      <p class="text-[14px] apple-font">{{ name }}</p>
      <p>{{ amountOfProjects }}</p>
    </div>
    <DragCon class="" v-for="project in projects" :key="project.name" :name="project.name">
      <Project @drag-switch="dragSwitch()" :project="project"></Project>
    </DragCon>
    <DropZone :id="id" />
  </div>
</template>
<script setup>
import DropZone from '@/components/draggable_containers/DropZone.vue'
import Project from '@/components/project_components/SavedProject.vue'
import DragCon from '@/components/draggable_containers/DraggableContainer.vue'
import { ref, provide, onMounted } from 'vue'
import LocalStorageManager from '@/manager/local_storage_manager'
import { emitter } from '@/event_bus'

const hovered = ref(false)

const props = defineProps({
  name: String,
  id: String,
  projects: Array,
  amountOfProjects: Number
})

const amountOfProjects = ref(props.amountOfProjects)

onMounted(() => {
  emitter.on('saveProject', () => {
    amountOfProjects.value = LocalStorageManager.getSavedProject().filter(
      (project) => project.status === props.id
    ).length
  })
  emitter.on('unsaveProject', () => {
    amountOfProjects.value = LocalStorageManager.getSavedProject().filter(
      (project) => project.status === props.id
    ).length
  })
  emitter.on('updateSavedProject', () => {
    amountOfProjects.value = LocalStorageManager.getSavedProject().filter(
      (project) => project.status === props.id
    ).length
  })
  emitter.on('addSavedProject', () => {
    amountOfProjects.value = LocalStorageManager.getSavedProject().filter(
      (project) => project.status === props.id
    ).length
  })
})

const isDragAvailable = ref(true)
provide('dragAvailable', isDragAvailable)

const dragSwitch = () => {
  isDragAvailable.value = !isDragAvailable.value
}
</script>
