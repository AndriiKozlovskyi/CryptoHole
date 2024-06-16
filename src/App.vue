<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue';
import ProfileMenu from './components/ProfileMenu.vue';
</script>

<template>

  <div class="bg-[#101114] h-full w-full">
    <HeaderBar/>
    <RouterView class="h-full"/>
    <ProfileMenu class="fixed top-[8rem] right-[10rem]">
    </ProfileMenu>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #app {
  height: 100%;
  font-family: 'Montserrat', sans-serif;
  background: rgb(30, 31, 36);

}
</style>
