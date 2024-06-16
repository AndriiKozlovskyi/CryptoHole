<template>
  <div class="relative w-3/5 grid grid-cols-4 gap-4 overflow-y-hidden">
    <ProjectBar v-for="project in projects" :key="project.name" 
    :project="project"
  /> 
  </div>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import ProjectBar from './ProjectBar1.vue'
import LocalStorageManager from '@/manager/local_storage_manager';

const projects = ref(LocalStorageManager.getProjects());
//  onBeforeMount(() => {
//   LocalStorageManager.setProjects([ {name: "Blast through Ambient Finance", expenses: 100, participants: 54, tag: "Game", src: "https://images.cointelegraph.com/cdn-cgi/image/format=auto,onerror=redirect,quality=90,width=1434/https://s3.cointelegraph.com/storage/uploads/view/e09726c06084625fce19cb193ee079fd.jpg"},
//   {name: "Layer 3", expenses: 23, participants: 23, tag: "Airdrop", src: "https://miro.medium.com/v2/resize:fit:1400/1*EzelpZ7tLKZbyijACRyE1g.jpeg"},
//  ])
//  });


</script>

<style>
::-webkit-scrollbar {
  margin-left: 12px;
  width: 6px;
  border-radius: 20px;
}

/* Track */
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
