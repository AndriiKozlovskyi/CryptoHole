<template>
  <div id="container">
    <div :id="props.name">
      <slot ></slot>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

let container = null;
let el = null;
let isDragging = ref(false);
let cOffX = 0;
let cOffY = 0;

const props = defineProps({
  name: String
});

onMounted(() => {
  el = document.getElementById(props.name);
  el.style.position = "relative";
  el.style.width = "18rem";
  el.style.zIndex = 1000;
  el.style.paddingTop = '1rem';
  el.style.paddingLeft = '1rem';
  el.style.paddingRight = '1rem';

  container = document.getElementById('container');
  
  el.addEventListener('mousedown', dragStart);
});

const d = 'dragging';

function dragStart(e) {
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

  const dropZones = document.querySelectorAll('.drop-zone');
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
    closestDropZone.appendChild(el);
    el.style.position = 'relative';
    el.style.paddingTop = '1rem'
    el.style.paddingLeft = '1rem'
    el.style.paddingRight = '1rem'

    el.style.left = '0px';
    el.style.top = '0px';
    el.classList.remove(d);

  }
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
  opacity: 1;
}
</style>
