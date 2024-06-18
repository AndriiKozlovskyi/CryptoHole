<template>
  <div id="container">
    <div :id="props.name">
      <slot ></slot>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue';
import LocalStorageManager from "@/manager/local_storage_manager.ts";
let container = null;
let el = null;
let isDragging = ref(false);
let cOffX = 0;
let cOffY = 0;

const isDragAvailable = inject('dragAvailable');
let indicator = null;
const props = defineProps({
  name: String
});

onMounted(() => {
  el = document.getElementById(props.name);
  el.style.position = "relative";
  el.style.width = "16.25rem";
  el.style.zIndex = 900;
  el.style.paddingTop = '0.2rem';
  el.style.paddingLeft = '0.5rem';
  el.style.paddingRight = '0.5rem';

  indicator = document.createElement('div');
  indicator.style.position = 'absolute';
  indicator.style.height = '2px';
  indicator.style.backgroundColor = 'blue';
  indicator.style.opacity = 0.5
  indicator.style.width = '80%';
  indicator.style.display = 'none';
  document.body.appendChild(indicator);
  // el.style.fontWeight = 200

  container = document.getElementById('container');
  
  el.addEventListener('mousedown', dragStart);
});

const d = 'dragging';

function dragStart(e) {
  console.log(isDragAvailable.value)
  if (!isDragAvailable) return; 
  e = e || window.event;
  e.preventDefault();
  console.log("vrevb")

  cOffX = e.clientX - el.offsetLeft;
  cOffY = e.clientY - el.offsetTop;

  document.addEventListener('mousemove', dragMove);
  document.addEventListener('mouseup', dragEnd);

  el.classList.add(d);
  container.style.cursor = 'move';

  isDragging.value = true;
}

function dragMove(e) {
  e = e || window.event;
  e.preventDefault();
  el.style.zIndex = 950;

  const cursorX = e.clientX;
  const cursorY = e.clientY;

  let closestDropZone = null;
  let minDistance = Infinity;

  const dropZones = document.querySelectorAll('.drop-zone');

  dropZones.forEach(dropZone => {
    const dropZoneRect = dropZone.getBoundingClientRect();

    if (isIntersectingPoint(cursorX, cursorY, dropZoneRect)) {
      const distance = Math.sqrt(
        Math.pow(cursorX - (dropZoneRect.left + dropZoneRect.width / 2), 2) +
        Math.pow(cursorY - (dropZoneRect.top + dropZoneRect.height / 2), 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestDropZone = dropZone;
      }
    }
  });

  if (closestDropZone) {
    const children = Array.from(closestDropZone.children);
    let insertBeforeElement = null;
    let indicatorTop = null;

    for (let child of children) {
      const childRect = child.getBoundingClientRect();
      if (cursorY < childRect.top + childRect.height / 2) {
        insertBeforeElement = child;
        indicatorTop = childRect.top;
        break;
      }
    }

    if (!insertBeforeElement) {
      const dropZoneRect = closestDropZone.getBoundingClientRect();
      indicatorTop = dropZoneRect.bottom;
    }

    indicator.style.top = indicatorTop + 'px';
    indicator.style.left = closestDropZone.getBoundingClientRect().left + 'px';
    indicator.style.width = closestDropZone.getBoundingClientRect().width + 'px';
    indicator.style.display = 'block';
  } else {
    indicator.style.display = 'none';
  }
  const index = Array.prototype.indexOf.call(el.parentNode.children, el);

  el.style.top = (e.clientY - index * el.offsetHeight - cOffY).toString() + 'px';
  el.style.left = (e.clientX - cOffX).toString() + 'px';
}

function dragEnd(e) {
  e = e || window.event;
  e.preventDefault();

  document.removeEventListener('mousemove', dragMove);
  document.removeEventListener('mouseup', dragEnd);

  container.style.cursor = null;

  isDragging.value = false;
  indicator.style.display = 'none';

  const elRect = el.getBoundingClientRect();
  const cursorX = e.clientX;
  const cursorY = e.clientY;

  let closestDropZone = null;
  let minDistance = Infinity;

  const dropZones = document.querySelectorAll('.drop-zone');

  dropZones.forEach(dropZone => {
    const dropZoneRect = dropZone.getBoundingClientRect();

    if (isIntersectingPoint(cursorX, cursorY, dropZoneRect)) {
      const distance = Math.sqrt(
        Math.pow(cursorX - (dropZoneRect.left + dropZoneRect.width / 2), 2) +
        Math.pow(cursorY - (dropZoneRect.top + dropZoneRect.height / 2), 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestDropZone = dropZone;
      }
    }
  });

  if (closestDropZone) {
    const children = Array.from(closestDropZone.children);
    let insertBeforeElement = null;

    for (let child of children) {
      const childRect = child.getBoundingClientRect();
      if (cursorY < childRect.top + childRect.height / 2) {
        insertBeforeElement = child;
        break;
      }
    }

    closestDropZone.insertBefore(el, insertBeforeElement);

    el.style.position = 'relative';
    el.style.paddingTop = '0.2rem';
    el.style.paddingLeft = '0.5rem';
    el.style.paddingRight = '0.5rem';
    el.style.left = '0px';
    el.style.top = '0px';
    el.classList.remove(d);

    const project = LocalStorageManager.getSavedProjectByName(el.id);
    project.status = closestDropZone.id;
    LocalStorageManager.updateSavedProject(project);
  }
}

function isIntersectingPoint(x, y, rect) {
  return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;
}


function isIntersecting(rect1, rect2) {
  return !(rect2.left > rect1.right || 
           rect2.right < rect1.left || 
           rect2.top > rect1.bottom ||
           rect2.bottom < rect1.top);
}

</script>

<style>
.dragging {
  opacity: 0.5;
}
</style>
