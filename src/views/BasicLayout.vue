<template>
    <HeaderBar />
    <RouterView class="h-full" />
    <SideMenu class="fixed top-[8rem] right-[10rem]" />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBar from '@/components/header/HeaderBar.vue'
import SideMenu from '@/components/menu/SideMenu.vue'
import { onBeforeMount } from 'vue';
import ProjectManager from '@/manager/project_manager';
import SavedProjectManager from '@/manager/saved_project_manager';

onBeforeMount (async () => {
  await ProjectManager.loadAll();
  await SavedProjectManager.loadAll();

})
</script>
