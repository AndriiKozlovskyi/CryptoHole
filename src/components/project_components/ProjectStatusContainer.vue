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
    <DropZone :id="id">
      <DragCon class="relative top-0 left-0" v-for="project in projects" :key="project.name" :id="project.id">
        <Project @drag-switch="dragSwitch()" :id="project.id"/>
      </DragCon>
    </DropZone>
  </div>
</template>
<script setup>
import DropZone from '@/components/draggable_containers/DropZone.vue'
import Project from '@/components/project_components/SavedProject.vue'
import DragCon from '@/components/draggable_containers/DraggableContainer.vue'
import { ref, provide, computed, onMounted } from 'vue'
import SavedProjectManager from '@/manager/saved_project_manager'

const hovered = ref(false)

const props = defineProps({
  name: String,
  id: String,
  projects: Array,
  amountOfProjects: Number
})

const amountOfProjects = computed(() => SavedProjectManager.all().filter(
      (project) => project.status === props.id
    ).length);

const isDragAvailable = ref(true)
provide('dragAvailable', isDragAvailable)

const dragSwitch = () => {
  isDragAvailable.value = !isDragAvailable.value
}
</script>
