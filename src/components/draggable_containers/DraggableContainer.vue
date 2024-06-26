<template>
  <div id="container">
    <div :id="id">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue'
import LocalStorageManager from '@/manager/local_storage_manager.ts'
import SavedProjectManager from '@/manager/saved_project_manager';

let container = null
let el = null
let indicator = null
let cOffX = 0
let cOffY = 0

const isDragging = ref(false)
const isDragAvailable = inject('dragAvailable')
const props = defineProps({
  id: Number
})

const d = 'dragging'

const setElementStyles = (element, styles) => {
  for (const [key, value] of Object.entries(styles)) {
    element.style[key] = value
  }
}

const createIndicator = () => {
  const indicator = document.createElement('div')
  setElementStyles(indicator, {
    position: 'absolute',
    height: '2px',
    backgroundColor: 'blue',
    opacity: 0.5,
    width: '80%',
    display: 'none'
  })
  document.body.appendChild(indicator)
  return indicator
}

const initializeElement = (el) => {
  setElementStyles(el, {
    position: 'relative',
    width: '16.25rem',
    paddingTop: '0.2rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem'
  })
}

const getClosestDropZone = (cursorX, cursorY) => {
  let closestDropZone = null
  let minDistance = Infinity

  document.querySelectorAll('.drop-zone').forEach((dropZone) => {
    const dropZoneRect = dropZone.getBoundingClientRect()
    if (isIntersectingPoint(cursorX, cursorY, dropZoneRect)) {
      const distance = Math.sqrt(
        Math.pow(cursorX - (dropZoneRect.left + dropZoneRect.width / 2), 2) +
          Math.pow(cursorY - (dropZoneRect.top + dropZoneRect.height / 2), 2)
      )

      if (distance < minDistance) {
        minDistance = distance
        closestDropZone = dropZone
      }
    }
  })

  return closestDropZone
}

const updateIndicatorPosition = (closestDropZone, cursorY) => {
  const children = Array.from(closestDropZone.children)
  let insertBeforeElement = null
  let indicatorTop = null

  for (let child of children) {
    if (el.id === child.id) continue

    const childRect = child.getBoundingClientRect()
    if (cursorY < childRect.top + childRect.height / 2) {
      insertBeforeElement = child
      indicatorTop = childRect.top
      break
    } else if (cursorY > childRect.top + childRect.height / 2 && cursorY < childRect.bottom) {
      insertBeforeElement = child
      indicatorTop = childRect.bottom
      break
    } else if (cursorY > children[children.length - 1].getBoundingClientRect().bottom) {
      insertBeforeElement = children[children.length - 1]
      indicatorTop = children[children.length - 1].getBoundingClientRect().bottom
      break
    }
  }

  if (!insertBeforeElement) {
    const dropZoneRect = closestDropZone.getBoundingClientRect()
    indicatorTop = dropZoneRect.top
  }

  setElementStyles(indicator, {
    top: `${indicatorTop}px`,
    left: `${closestDropZone.getBoundingClientRect().left}px`,
    width: `${closestDropZone.getBoundingClientRect().width}px`,
    display: 'block'
  })
}

const dragStart = (e) => {
  if (!isDragAvailable) return
  e.preventDefault()

  cOffX = e.clientX - el.offsetLeft
  cOffY = e.clientY - el.offsetTop

  document.addEventListener('mousemove', dragMove)
  document.addEventListener('mouseup', dragEnd)

  el.classList.add(d)
  container.style.cursor = 'move'
  isDragging.value = true
}

const dragMove = (e) => {
  e.preventDefault()

  el.style.zIndex = 1001

  const cursorX = e.clientX
  const cursorY = e.clientY
  const closestDropZone = getClosestDropZone(cursorX, cursorY)

  if (closestDropZone) {
    updateIndicatorPosition(closestDropZone, cursorY)
  } else {
    indicator.style.display = 'none'
  }
  const index = Array.prototype.indexOf.call(el.parentNode.children, el)

  el.style.top = (e.clientY - index * el.offsetHeight - cOffY).toString() + 'px'
  el.style.left = `${e.clientX - cOffX}px`
}

const dragEnd = (e) => {
  e.preventDefault()
  el.style.zIndex = 900

  document.removeEventListener('mousemove', dragMove)
  document.removeEventListener('mouseup', dragEnd)

  container.style.cursor = null
  isDragging.value = false
  indicator.style.display = 'none'

  const cursorX = e.clientX
  const cursorY = e.clientY
  const closestDropZone = getClosestDropZone(cursorX, cursorY)

  if (closestDropZone) {
    insertElementIntoDropZone(closestDropZone, cursorY)
  } else {
    resetElementStyles(el)
  }
}

const insertElementIntoDropZone = (closestDropZone, cursorY) => {
  const children = Array.from(closestDropZone.children)
  let insertBeforeElement = null

  for (let child of children) {
    if (el.id === child.id) continue

    const childRect = child.getBoundingClientRect()
    if (cursorY < childRect.top + childRect.height / 2) {
      insertBeforeElement = child
      break
    }
  }

  closestDropZone.insertBefore(el, insertBeforeElement)
  resetElementStyles(el)
  el.classList.remove(d)

  const projects = Array.from(closestDropZone.children).map((child) => {
    const project = SavedProjectManager.getById(child.id);
    project.status = closestDropZone.id;
    SavedProjectManager.update(project.id, project);
    return project;
  })

  LocalStorageManager.updateSavedProjectsByOrder(projects, closestDropZone.id)
}

const resetElementStyles = (el) => {
  setElementStyles(el, {
    position: 'relative',
    paddingTop: '0.2rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    left: '0px',
    top: '0px'
  })
  el.classList.remove(d)
}

const isIntersectingPoint = (x, y, rect) => {
  return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom
}

onMounted(() => {
  el = document.getElementById(props.id)
  console.log(props.id)
  container = document.getElementById('container')
  indicator = createIndicator()
  initializeElement(el)
  el.addEventListener('mousedown', dragStart)
})
</script>

<style>
.dragging {
  opacity: 0.5;
}
</style>
