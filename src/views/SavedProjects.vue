<template>
  <div class="relative w-full flex flex-col items-center mt-[6rem]">
    <div class="flex flex-col w-full ml-[10rem] space-y-5">
      <p class="font-semibold text-lg text-white">Saved Projects</p>
      <div class="w-full flex flex-row gap-1 overflow-y-hidden">
        <div class="flex bg-primary-item-color rounded-xl flex-col w-min">
          <div
            class="flex mt-1 flex-row items-center justify-between text-secondary-text-color w-full"
          >
            <p class="apple-font text-sm p-3">TODO</p>
            <p class="px-3">{{ todoProjects.length }}</p>
          </div>
          <DragCon class="" v-for="project in projects" :key="project.name" :name="project.name">
            <ProjectBar @drag-switch="dragSwitch()" :project="project"></ProjectBar>
          </DragCon>
          <DropZone id="todo" />
        </div>

        <!-- <ProgressBar
          :amountOfProjects="todoProjects.length"
          name="TODO"
          id="todo"
        /> -->

        <ProgressBar
          :amountOfProjects="progressProjects.length"
          name="IN PROGRESS"
          id="progress"
        />
        <ProgressBar
          :amountOfProjects="waitingProjects.length"
          name="WAITING FOR PAYMENT"
          id="waiting"
        />
        <ProgressBar :amountOfProjects="paidProjects.length" name="PAID" id="paid" />
        <ProgressBar :amountOfProjects="failedProjects.length" name="FAILED" id="failed" />
      </div>
      <i
        class="fixed cursor-pointer right-4 bottom-4 text-white pi pi-question-circle"
        style="font-size: 2rem"
      />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, provide, computed, ref } from 'vue'
import ProjectBar from '@/components/project_components/SavedProject.vue'
import LocalStorageManager from '@/manager/local_storage_manager'
import { emitter } from '@/event_bus'
import DropZone from '@/components/draggable_containers/DropZone.vue'
import DragCon from '@/components/draggable_containers/DraggableContainer.vue'
import ProgressBar from '@/components/project_components/ProjectStatusContainer.vue'

const projects = ref(LocalStorageManager.getSavedProject())

const todoProjects = computed(() => projects.value.filter((project) => project.status === 'todo'))
const progressProjects = computed(() =>
  projects.value.filter((project) => project.status === 'progress')
)
const waitingProjects = computed(() =>
  projects.value.filter((project) => project.status === 'waiting')
)
const paidProjects = computed(() => projects.value.filter((project) => project.status === 'paid'))
const failedProjects = computed(() =>
  projects.value.filter((project) => project.status === 'failed')
)

onBeforeMount(() => {
  emitter.on('saveProject', () => {
    projects.value = LocalStorageManager.getSavedProject()
  })
  emitter.on('unsaveProject', () => {
    projects.value = LocalStorageManager.getSavedProject()
  })
  emitter.on('updateSavedProject', () => {
    projects.value = LocalStorageManager.getSavedProject()
  })
  emitter.on('addSavedProject', () => {
    projects.value = LocalStorageManager.getSavedProject()
  })
})

onMounted(() => {
  addProjectBarToDropZone()
})

const addProjectBarToDropZone = () => {
  if (projects.value === null) {
    return
  }
  const elementList = projects.value.map((project) => {
    return document.getElementById(project.name)
  })

  for (let i = 0; i < elementList.length; i++) {
    for (let j = 0; j < projects.value.length; j++) {
      const element = elementList[i]
      const project = projects.value[j]
      if (project.name === element.id) {
        switch (project.status) {
          case 'todo':
            addElement(element, 'todo')
            break
          case 'progress':
            addElement(element, 'progress')
            break
          case 'waiting':
            addElement(element, 'waiting')
            break
          case 'paid':
            addElement(element, 'paid')
            break
          case 'failed':
            addElement(element, 'failed')
            break
        }
      }
    }
  }
}
const addElement = (el, id) => {
  document.getElementById(id).appendChild(el)
  console.log(document.getElementById(id))
  el.style.position = 'relative'
  el.style.paddingLeft = '0.5rem'
  el.style.paddingRight = '0.5rem'
  el.style.left = '0px'
  el.style.top = '0px'
  el.classList.remove('dragging')
}

const isDragAvailable = ref(true)
provide('dragAvailable', isDragAvailable)

const dragSwitch = () => {
  console.log(isDragAvailable.value)

  isDragAvailable.value = !isDragAvailable.value
}
</script>
