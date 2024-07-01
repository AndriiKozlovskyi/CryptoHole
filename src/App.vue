<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-[#101114] h-full w-full">
    <Toast/>
    <RouterView class="h-full" />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body,
#app {
  height: 100%;
  background: #101114;
  --background-color: #101114;
  --primary-item-color: #1e1f24;
  --hover-item-color: #28292e;
  --secondary-text-color: #98989d;
  font-family:
    Inter,
    Helvetica Rounded,
    Helvetica,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Helvetica Neue,
    Arial,
    Noto Sans,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji,
    Segoe UI Symbol,
    Noto Color Emoji;
}

.tag-bg {
  border-top-left-radius: 30%;
}
.font {
  font-size: 16px;
  font-weight: 400;
}

.apple-font {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
}
</style>
