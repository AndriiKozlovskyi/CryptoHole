<template>
  <div id="container">
    <div :id="props.name">
      <slot></slot>
    </div>
    <div id="drop-zone">
      Drop here
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

let container = null;
let el = null;
let id = ref("");
let isDragging = ref(false);

const props = defineProps({
  name: String
});

onMounted(() => {
  el = document.getElementById(props.name);
  el.style.position = "absolute";
  el.style.width = "18rem";
  el.style.height = "22.8rem";
  el.style.zIndex = 1000;
  container = document.getElementById('container');

  el.addEventListener('mousedown', dragStart);

  // Set the drop zone dimensions
  const dropZone = document.getElementById('drop-zone');
  dropZone.style.width = el.style.width;
  dropZone.style.height = el.style.height;
});

const d = 'dragging';
var cOffX = 0;
var cOffY = 0;

function dragStart(e) {
  e = e || window.event;
  e.preventDefault();

  cOffX = e.clientX - el.offsetLeft;
  cOffY = e.clientY - el.offsetTop;

  document.addEventListener('mousemove', dragMove);
  document.addEventListener('mouseup', dragEnd);

  el.classList.add(d);
  container.style.cursor = 'move';

  isDragging.value = true;  // Show drop zone when dragging starts
};

function dragMove(e) {
  e = e || window.event;
  e.preventDefault();

  el.style.top = (e.clientY - cOffY).toString() + 'px';
  el.style.left = (e.clientX - cOffX).toString() + 'px';
};

function dragEnd(e) {
  e = e || window.event;
  e.preventDefault();

  document.removeEventListener('mousemove', dragMove);
  document.removeEventListener('mouseup', dragEnd);

  el.classList.remove(d);
  container.style.cursor = null;

  isDragging.value = false; // Hide drop zone when dragging ends

  // Check if the element intersects with any drop zones and find the closest one
  const dropZones = document.querySelectorAll('#drop-zone');
  const elRect = el.getBoundingClientRect();

  let closestDropZone = null;
  let minDistance = Infinity;

  dropZones.forEach(dropZone => {
    const dropZoneRect = dropZone.getBoundingClientRect();

    if (isIntersecting(elRect, dropZoneRect)) {
      const elCenter = {
        x: elRect.left + elRect.width / 2,
        y: elRect.top + elRect.height / 2
      };
      const dropZoneCenter = {
        x: dropZoneRect.left + dropZoneRect.width / 2,
        y: dropZoneRect.top + dropZoneRect.height / 2
      };

      const distance = Math.sqrt(
        Math.pow(elCenter.x - dropZoneCenter.x, 2) +
        Math.pow(elCenter.y - dropZoneCenter.y, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestDropZone = dropZone;
      }
    }
  });

  if (closestDropZone) {
    const dropZoneRect = closestDropZone.getBoundingClientRect();
    el.style.left = dropZoneRect.left - container.getBoundingClientRect().left + 'px';
    el.style.top = dropZoneRect.top - container.getBoundingClientRect().top + 'px';
  }
};

function isIntersecting(rect1, rect2) {
  return !(rect2.left > rect1.right || 
           rect2.right < rect1.left || 
           rect2.top > rect1.bottom ||
           rect2.bottom < rect1.top);
}
</script>

<style>
#drop-zone {
  position: relative;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #aaa;
}
</style>
