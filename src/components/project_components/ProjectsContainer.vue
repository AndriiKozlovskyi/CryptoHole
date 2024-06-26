<template>
  <div class="flex flex-row justify-center">
    <div class="w-[56rem] grid grid-cols-3 gap-4 overflow-y-hidden">
      <Project v-for="project in projects" :key="project.name" :id="project.id" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import Project from '@/components/project_components/Project.vue'
import ProjectManager from '@/manager/project_manager';

const projects = computed(() => ProjectManager.all())
</script>

<style>
::-webkit-scrollbar {
  margin-left: 12px;
  width: 6px;
  border-radius: 20px;
}

::-webkit-scrollbar-track {
  border-radius: 1px;
  width: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(19, 25, 27);
  border-radius: 100px;
  width: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #0a211a;
}
</style>
