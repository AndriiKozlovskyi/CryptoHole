<template>
    <div class="px-4 py-3 w-1/6 cursor-pointer space-y-2 font flex flex-col font-lg right-0 top-[6rem] rounded-xl">
        <MenuItem name="All Projects" :countOfItemsInside="projectLength" path="/">
            <i class="pi pi-th-large"/>
        </MenuItem>
        <MenuItem name="Saved Projects" :countOfItemsInside="savedProjectLength" path="/saved_projects">
            <i class="pi pi-bookmark-fill"/>
        </MenuItem>
    </div>
</template>
<script setup lang="ts">
import LocalStorageManager from '@/manager/local_storage_manager';
import { ref, onBeforeMount, computed } from 'vue';
import { emitter } from '@/event_bus';
import MenuItem from "./MenuItem.vue";


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

const projectLength = computed(() => {
    if(projects.value === undefined || projects.value === null) {
        return 0;
    }
    return projects.value.length;
});

const savedProjectLength = computed(() => {
    if(savedProjects.value === undefined || savedProjects.value === null) {
        return 0;
    }
    return savedProjects.value.length;
})

</script>
<style>
</style>