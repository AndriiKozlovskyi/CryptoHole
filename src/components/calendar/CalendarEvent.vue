<template>
  <div class="flex flex-col p-3 w-full shadow-xl justify-between rounded-lg bg-hover-primary-item-color h-[8rem]">
    <div class="flex flex-row rounded-md ">
      <p class="text-white text-[14px] apple-font">{{ name }}</p>
      <span v-if="tip == 'ends'" class=" h-1 w-1 rounded-full bg-[#8b3434]"></span>
      <span v-if="tip == 'starts'" class=" h-1 w-1 rounded-full bg-[#436b3c]"></span>

    </div>
    <div class="flex flex-row items-center space-x-3">
      <i v-if="tip == 'ends'" class="pi pi-clock"/>
      <i v-if="tip == 'starts'" class="pi pi-clock"/>

      <p>{{ date }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  name: String,
  tip: String,
  date: String,
})
</script>
