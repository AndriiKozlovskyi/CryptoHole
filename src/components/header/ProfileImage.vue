<template>
  <span
    class="flex flex-col rounded-full cursor-pointer justify-center items-center px-2 py-2 hover:bg-[#211f1f]"
  >
    <img
      class="circle-image1"
      src="https://masterpiecer-images.s3.yandex.net/ae360eac8a1c11ee951b7a2f0d1382ba:upscaled"
    />
  </span>
</template>
<script setup lang="ts"></script>

<style>
.circle-image1 {
  width: 60px; /* Adjust the width and height as needed */
  height: 60px; /* Ensure width and height are equal for a perfect circle */
  border-radius: 50%;
  object-fit: cover; /* Ensure the image covers the entire area */
}
</style>
