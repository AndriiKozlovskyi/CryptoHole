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
  border: 2px #ccc;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  font-size: 1rem;
  color: #aaa;
  height: 100%;
  background-color: #141418;
  padding-bottom: 1rem;
  width: 16.25rem;

}
</style>
