<template>
  <div class="flex flex-col h-screen w-[15rem] bg-[#1c1d20] top-0 i9tems justify-between">
    <div class="flex flex-col items-center justify-center w-full">
      <img src="/Logo.png" width="100px" height="100px" />
      <p class="text-white font-semibold text-[30px]">WIPE</p>
    </div>
    <div class="flex flex-col mb-[12rem]">
      <MenuItem1 name="Home" path="home">
        <i class="pi pi-home" />
      </MenuItem1>
      <!-- <MenuItem1 name="Marketplace" path="saved_projects">
        <i class="pi pi-shop" />
      </MenuItem1> -->
      <MenuItem1 name="Guides" path="guides">
        <i class="pi pi-book" />
      </MenuItem1>
      <MenuItem1 name="News" path="news">
        <i class="pi pi-megaphone" />
      </MenuItem1>
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
import MenuItem1 from './MenuItem.vue'
import AuthManager from '@/manager/auth_manager';
import { useRouter } from 'vue-router';

const router = useRouter();
const logout = () => {
  AuthManager.logout();
  router.push({ name: 'login' });
}
</script>
