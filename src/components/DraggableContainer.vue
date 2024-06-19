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

  container = document.getElementById('container');

  el.addEventListener('mousedown', dragStart);
});

const d = 'dragging';

function dragStart(e) {
  if (!isDragAvailable) return; 
  e = e || window.event;
  e.preventDefault();

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

  const cursorX = e.clientX;
  const cursorY = e.clientY;

  let closestDropZone = null;
  let minDistance = Infinity;
  el.style.zIndex = 1001; // Adjust this value as needed
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
      if(el.id === child.id) {
        continue;
      }
      const childRect = child.getBoundingClientRect();
      if (cursorY < childRect.top + childRect.height / 2) {
        insertBeforeElement = child;
        indicatorTop = childRect.top;
        break;
      }
      else if (cursorY > childRect.top + childRect.height / 2 && cursorY < childRect.top + childRect.height) {
        insertBeforeElement = child;
        indicatorTop = childRect.bottom;
        break;
      }

      else if (cursorY > children[children.length-1].getBoundingClientRect().top + children[children.length-1].getBoundingClientRect().height) {
        insertBeforeElement = children[children.length-1];
        indicatorTop = children[children.length-1].getBoundingClientRect().bottom;
        break;
      }
    }

   if (!insertBeforeElement) {
      const dropZoneRect = closestDropZone.getBoundingClientRect();
      indicatorTop = dropZoneRect.top;
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
  el.style.zIndex = 900; // Adjust this value as needed


  document.removeEventListener('mousemove', dragMove);
  document.removeEventListener('mouseup', dragEnd);

  container.style.cursor = null;

  isDragging.value = false;
  indicator.style.display = 'none';

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
      if(el.id === child.id) {
        continue;
      }
      const childRect = child.getBoundingClientRect();
      if (cursorY < childRect.top + childRect.height / 2) {
        console.log("UIBIBIBUBUIIBUUIBBIU")
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

    const projects = [];
    for (const child of closestDropZone.children) {
      const project = LocalStorageManager.getSavedProjectByName(child.id);
      project.status = closestDropZone.id;
      console.log(project)
      LocalStorageManager.updateSavedProject(project);
      projects.push(project)
    }

    LocalStorageManager.updateSavedProjectsByOrder(projects, closestDropZone.id)
  }
  if (!closestDropZone) {
      el.style.display = 'relative';
      el.style.paddingTop = '0.2rem';
      el.style.paddingLeft = '0.5rem';
      el.style.paddingRight = '0.5rem';
      el.style.left = '0px';
      el.style.top = '0px';
      el.classList.remove(d);
    }
}

function isIntersectingPoint(x, y, rect) {
  return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;
}

</script>

<style>
.dragging {
  opacity: 0.5;
}
</style>
