<template>
  <div class="flex flex-row justify-center w-full">
    <div class="w-full grid grid-cols-3 gap-10 overflow-y-hidden">
      <Project v-for="project in projects" :key="project.name" :id="project.id" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import Project from '@/components/project_components/Project.vue'
import EventManager from '@/manager/event_manager';

const projects = computed(() => EventManager.all())
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
