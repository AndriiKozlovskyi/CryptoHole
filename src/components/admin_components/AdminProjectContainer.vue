<template>
  <div class="flex flex-row justify-center">
    <div class="w-[56rem] grid grid-cols-3 gap-4 overflow-y-hidden">
      <ProjectAdmin v-for="project in projects" :project="project" :key="project.name" @deleteProject="removeProject(project)" />
      <CreateProjectButton @click="$router.push('/admin/create_project')"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import ProjectAdmin from './ProjectAdmin.vue';
import CreateProjectButton from './CreateProjectButton.vue';
import ProjectManager from '@/manager/project_manager';
import Project from '@/models/project_model';

const projects = computed(() => ProjectManager.all())

const removeProject = async (project: Project) => {
  await ProjectManager.deleteProject(project.id)
}

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


::-webkit-scrollbar-thumb {
  background: rgb(19, 25, 27);
  border-radius: 100px;
  width: 10px;
}


::-webkit-scrollbar-thumb:hover {
  background: #0a211a;
}
</style>
