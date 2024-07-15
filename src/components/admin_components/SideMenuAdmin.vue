<template>
    <div class="flex flex-col h-screen w-[15rem] bg-[#1c1d20] top-0 i9tems justify-between">
      <div class="flex flex-col items-center justify-center w-full">
        <img src="/Logo.png" width="100px" height="100px" />
        <p class="text-white font-semibold text-[30px]">WIPE</p>
        <p class="text-white text-[20px]">Admin Mode</p> 
      </div>
      <div class="flex flex-col mb-[12rem]">
        <MenuItemAdmin name="Event Management" path="event_management">
          <i class="pi pi-home" />
        </MenuItemAdmin>
        <!-- <MenuItem1 name="Marketplace" path="saved_projects">
          <i class="pi pi-shop" />
        </MenuItem1> -->
        <MenuItemAdmin name="Guides Management" path="guides">
          <i class="pi pi-book" />
        </MenuItemAdmin>
        <MenuItemAdmin name="News Management" path="news">
          <i class="pi pi-megaphone" />
        </MenuItemAdmin>
      </div>
      <div
        class="flex flex-row p-4 items-center space-x-2 text-secondary-text-color hover:text-white cursor-pointer" @click="logout"
      >
        <i class="pi pi-sign-out" />
        <p>Logout</p>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import MenuItemAdmin from '../menu/MenuItem.vue';
  import AuthManager from '@/manager/auth_manager';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const logout = () => {
    AuthManager.logout();
    router.push({ name: 'login' });
  }
  </script>
  