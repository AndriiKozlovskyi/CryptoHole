<template>
  <div class="flex flex-row space-x-1 items-center">
    <img
      class="rounded-full"
      width="30px"
      height="30px"
      src="https://masterpiecer-images.s3.yandex.net/65782260a05d11eebe3ad20dae950626:upscaled"
    />
    <div class="absolute left-8 mt-5 flex opacity-75 flex-col bg-background-color px-2 rounded-full">
      <p class="text-[14px] text-white">{{ participants }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  participants: Number
})
</script>
