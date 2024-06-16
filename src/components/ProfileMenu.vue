<template>
    <div class="px-4 py-3 w-1/6 cursor-pointer space-y-2 font flex flex-col font-lg right-0 top-[6rem] rounded-xl">
        <!-- <div class="flex flex-row text-[#98989d] hover:scale-[1.02] rounded-2xl items-center text-[16px] hover:bg-[#28292e] hover:text-white space-x-3 px-4 py-3">
            <i class="pi pi-user"></i>
            <p>My Profile</p>
        </div> -->
        <div 
            :class="selected === 0 ? 'scale-[1.02] bg-[#1e1f22] text-white' : 'text-[#98989d] hover:bg-[#28292e] hover:text-white'"
            class="flex flex-row text-[#98989d] justify-between hover:scale-[1.02] rounded-2xl items-center text-[16px] px-4 py-3"
            @click="$router.push('/')"
        >
            <div class="flex flex-row items-center space-x-3">
                <i class="pi pi-th-large"></i>
                <p>All Projects</p>
            </div>
      
            <div class="flex flex-row justify-center items-center bg-[#101114] rounded-md">
                <p class="px-2 py-1 text-sm">{{projects.length}}</p>
            </div>
        </div>
        <div 
            :class="selected === 1 ? 'scale-[1.02] bg-[#1e1f22] text-white' : 'text-[#98989d] hover:bg-[#28292e] hover:text-white'"
            class="flex flex-row text-[#98989d] justify-between hover:scale-[1.02] rounded-2xl items-center text-[16px] px-4 py-3"
            @click="$router.push('/saved_projects')"
        >
            <div class="flex flex-row items-center space-x-3">
                <i class="pi pi-bookmark-fill"></i>
                <p>Saved Projects</p>
            </div>
      
            <div class="flex flex-row justify-center items-center bg-[#101114] rounded-md">
                <p class="px-2 py-1 text-sm">{{savedProjects.length}}</p>
            </div>
        </div>

        <div 
            class="flex flex-row text-[#98989d] justify-between hover:scale-[1.02] rounded-2xl items-center text-[16px] hover:bg-[#28292e] hover:text-white px-4 py-3"
        >
            <div class="flex flex-row items-center space-x-3">
                <i class="pi pi-hashtag"></i>
                <p>All Tags</p>
            </div>
      
            <div class="flex flex-row justify-center items-center bg-[#101114] rounded-md">
                <p class="px-2 py-1 text-sm">{{projects.length}}</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import LocalStorageManager from '@/manager/local_storage_manager';
import { ref, onBeforeMount, watch } from 'vue';
import { emitter } from '@/event_bus';
import { useRoute } from 'vue-router'

const route = useRoute()

const selected = ref(0);

onBeforeMount(() => {
    emitter.on("saveProject", () => {
        savedProjects.value = LocalStorageManager.getSavedProject();
    });
    emitter.on("unsaveProject", () => {
        savedProjects.value = LocalStorageManager.getSavedProject();
    });
  });

const savedProjects = ref(LocalStorageManager.getSavedProject());
const projects = ref(LocalStorageManager.getProjects());

watch(
  () => route.path,
    path => {
    if(path === '/') {
        selected.value = 0;
    }

    if(path === '/saved_projects') {
        selected.value = 1;
    }  }
)
</script>
<style>
</style>