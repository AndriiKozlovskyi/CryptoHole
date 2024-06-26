<template>
    <HeaderBar />
    <RouterView class="h-full" />
    <SideMenu class="fixed top-[8rem] right-[10rem]" />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBar from '@/components/header/HeaderBar.vue'
import SideMenu from '@/components/menu/SideMenu.vue'
</script>
