<template>
  <div
    class="fixed w-full flex z-[1000] flex-row justify-between text-secondary-text-color apple-font items-center"
  >
    <div class="flex flex-row space-x-6 w-1/3">
      <Logo />
      <HeaderItem name="News" @onClick="$router.push('/news')" />
      <HeaderItem name="Guides" @onClick="$router.push('/guides')" />
    </div>
    <div class="w-1/3 flex flex-row justify-center">
      <SearchBar class="w-1/2" />
    </div>
    <div class="flex flex-row items-end justify-end text-normal font-medium text-white w-1/3">
      <ProfileImage />
    </div>
  </div>
</template>
<script setup lang="ts">
import SearchBar from '@/components/basic_components/Search.vue'
import HeaderItem from '@/components/header/HeaderItem.vue'
import ProfileImage from '@/components/header/ProfileImage.vue'
import Logo from '@/components/logo/Logo.vue'
</script>
