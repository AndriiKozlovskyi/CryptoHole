<template>
  <div class="relative w-full h-full overflow-y-hidden flex flex-col items-center">
    <div class="flex flex-col w-full ml-[10rem] space-y-5  mt-[6rem]">
      <p class="font-semibold text-lg text-white">Saved Projects</p>
      <div class="w-full flex flex-row gap-1 overflow-y-hidden">
        <ProgressBar
          v-for="status in statusContainers"
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
import { provide, ref, computed } from 'vue'
import ProgressBar from '@/components/project_components/ProjectStatusContainer.vue'
import SavedProjectManager from '@/manager/saved_project_manager';
const projects = computed(() => SavedProjectManager.all())

const todoProjects = computed(() => projects.value.filter((project) => project.status === 'todo'));
const progressProjects = computed(() => projects.value.filter((project) => project.status === 'progress'));
const waitingProjects = computed(() => projects.value.filter((project) => project.status === 'waiting'));
const paidProjects = computed(() => projects.value.filter((project) => project.status === 'paid'));
const failedProjects = computed(() => projects.value.filter((project) => project.status === 'failed'));

const statusContainers = ref([
  { id: 'todo', name: 'TODO', projects: todoProjects },
  { id: 'progress', name: 'IN PROGRESS', projects: progressProjects },
  { id: 'waiting', name: 'WAITING FOR PAYMENT', projects: waitingProjects },
  { id: 'paid', name: 'PAID', projects: paidProjects },
  { id: 'failed', name: 'FAILED', projects: failedProjects }
]);

const isDragAvailable = ref(true)
provide('dragAvailable', isDragAvailable)
</script>
