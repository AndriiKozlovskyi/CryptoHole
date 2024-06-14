<template>
  <div :id="props.name" @mousedown="dragStart" class="draggable">
    <slot></slot>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  name: String,
  dropZonesCount: Number,
  elementWidth: String,
  elementHeight: String
});

let el = null;
const isDragging = ref(false);
const dropZones = ref([]);

onMounted(() => {
  el = document.getElementById(props.name);
  el.style.position = 'absolute';
  el.style.width = props.elementWidth;
  el.style.height = props.elementHeight;
  el.style.zIndex = 1000;

  for (let i = 0; i < props.dropZonesCount; i++) {
    const dropZone = document.getElementById(`drop-zone-${i}`);
    dropZones.value.push(dropZone);
  }
});

let cOffX = 0;
let cOffY = 0;

function dragStart(e) {
  e.preventDefault();
  cOffX = e.clientX - el.offsetLeft;
  cOffY = e.clientY - el.offsetTop;

  document.addEventListener('mousemove', dragMove);
  document.addEventListener('mouseup', dragEnd);

  isDragging.value = true;
}

function dragMove(e) {
  e.preventDefault();
  el.style.top = `${e.clientY - cOffY}px`;
  el.style.left = `${e.clientX - cOffX}px`;
}

function dragEnd(e) {
  e.preventDefault();
  document.removeEventListener('mousemove', dragMove);
  document.removeEventListener('mouseup', dragEnd);

  isDragging.value = false;

  const elRect = el.getBoundingClientRect();

  dropZones.value.forEach(dropZone => {
    const dropZoneRect = dropZone.getBoundingClientRect();
    if (isIntersecting(elRect, dropZoneRect)) {
      el.style.left = `${dropZoneRect.left - document.body.getBoundingClientRect().left}px`;
      el.style.top = `${dropZoneRect.top - document.body.getBoundingClientRect().top}px`;
    }
  });
}

function isIntersecting(rect1, rect2) {
  return !(rect2.left > rect1.right ||
           rect2.right < rect1.left ||
           rect2.top > rect1.bottom ||
           rect2.bottom < rect1.top);
}
</script>

<style scoped>
.draggable {
  cursor: move;
}
</style>
