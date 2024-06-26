<template>
  <div class="flex flex-col w-[14rem] space-y-2">
    <MenuItem name="All Projects" :countOfItemsInside="projectLength" path="/projects">
      <i class="pi pi-th-large" />
    </MenuItem>
    <MenuItem name="Saved Projects" :countOfItemsInside="savedProjectLength" path="/saved_projects">
      <i class="pi pi-bookmark-fill" />
    </MenuItem>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import MenuItem from './MenuItem.vue'
import SavedProjectManager from '@/manager/saved_project_manager';
import ProjectManager from '@/manager/project_manager';


const savedProjects = computed(() => SavedProjectManager.all())
const projects = computed(() => ProjectManager.all())

const projectLength = computed(() => {
  if (projects.value === undefined || projects.value === null) {
    return 0
  }
  return projects.value.length
})

const savedProjectLength = computed(() => {
  if (savedProjects.value === undefined || savedProjects.value === null) {
    return 0
  }
  return savedProjects.value.length
})
</script>
