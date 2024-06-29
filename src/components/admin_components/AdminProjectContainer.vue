<template>
    <div class="flex flex-row justify-center">
      <div class="w-[56rem] grid grid-cols-3 gap-4 overflow-y-hidden">
        <ProjectAdmin v-for="project in projects" :project="project" :key="project.name" @deleteProject="removeProject" />
        <CreateProjectButton @click="goToCreationPage"/>
      </div>
    </div>
  </template>
  <script lang="ts" setup>
  
  import type { Project } from '@/entity/Project';
  import { ref } from 'vue'
  import { PropType } from 'vue';
  import { useRouter } from 'vue-router';
  import LocalStorageManager from '@/manager/local_storage_manager'
  import ProjectAdmin from './ProjectAdmin.vue';
  import CreateProjectButton from './CreateProjectButton.vue';

  const props = defineProps({
    project: Object as PropType<Project>
  });

  const projects = ref(LocalStorageManager.getProjects())
  const router = useRouter();

  const removeProject = (project) => {
  projects.value = projects.value.filter(p => p.name !== project.name)
}
  const goToCreationPage = () => {
    router.push({name: 'create_project',params: { name: props.project?.name } })
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
  