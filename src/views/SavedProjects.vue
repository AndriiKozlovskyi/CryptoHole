<template>
  <div class="relative w-full flex flex-col items-center mt-[6rem]">
    <div class="flex flex-col w-full ml-[10rem] space-y-5">
      <p class="font-semibold text-lg text-white">Saved Projects</p>
      <div class="w-full flex flex-row gap-1 overflow-y-hidden">
        <ProgressBar
          v-for="status in statusContainers"
          :amountOfProjects="status.projects.length"
          :projects="status.projects"
          :key="status.id"
          :name="status.name"
          :id="status.id"
        />
      </div>
      <i
        class="fixed cursor-pointer right-4 bottom-4 text-white pi pi-question-circle"
        style="font-size: 2rem"
      />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, provide, ref } from 'vue'
import LocalStorageManager from '@/manager/local_storage_manager'
import { emitter } from '@/event_bus'
import ProgressBar from '@/components/project_components/ProjectStatusContainer.vue'

const projects = ref(LocalStorageManager.getSavedProject())

const todoProjects = ref(projects.value.filter((project) => project.status === 'todo'))
const progressProjects = ref(
  projects.value.filter((project) => project.status === 'progress')
)
const waitingProjects = ref(
  projects.value.filter((project) => project.status === 'waiting')
)
const paidProjects = ref(projects.value.filter((project) => project.status === 'paid'))
const failedProjects = ref(
  projects.value.filter((project) => project.status === 'failed')
)

const statusContainers = ref([
  {id: "todo", name: "TODO", projects: todoProjects},
  {id: "progress", name: "IN PROGRESS", projects: progressProjects}, 
  {id: "waiting", name: "WAITING FOR PAYMENT", projects: waitingProjects}, 
  {id: "paid", name: "PAID", projects: paidProjects}, 
  {id: "failed", name: "FAILED", projects: failedProjects}, 
])

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
});

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

</script>
