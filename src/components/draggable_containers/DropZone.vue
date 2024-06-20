<template>
  <div class="drop-zone">
    <slot></slot>
  </div>
</template>

<script setup>
</script>

<style>
.drop-zone {
  position: relative;
  color: #aaa;
  height: 100%;
  background-color: var(--primary-item-color);
  padding-bottom: 1rem;
  width: 16.25rem;
}
</style>
