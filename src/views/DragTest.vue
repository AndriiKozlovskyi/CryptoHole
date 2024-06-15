<template>
    <div id="">
      <draggable name="draggable-1" class="z-100">
        Drag me
      </draggable>
      
      <drop-zone name="drop-zone-1">
        Drop Zone 1
      </drop-zone>
  
      <drop-zone name="drop-zone-2">
        Drop Zone 2
      </drop-zone>
    </div>
  </template>
  
  <script setup>
  import Draggable from '@/components/DraggableContainer.vue';
  import DropZone from '@/components/DropZone.vue';
  </script>
  
  <style>
  #app {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 100vh;
  }
  </style>