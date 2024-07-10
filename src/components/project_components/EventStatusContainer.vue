<template>
  <div
    class="flex bg-primary-item-color h-[100%] rounded-md flex-col w-min"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="sticky flex flex-row items-center text-secondary-text-color justify-between p-3">
      <p class="text-[14px] apple-font">{{ name }}</p>
      <p class="text-[14px] apple-font">{{ amountOfProjects }}</p>
    </div>
    <div class="space-y-2 mb-2 w-[16.25rem] px-3">
      <div
        class="relative top-0 left-0"
        v-for="event in events"
        :key="event.name"
        :id="event.id"
      >
        <SavedEvent :id="event.id" />
      </div>
    </div>
  </div>
</template>
<script setup>
import SavedEvent from '@/components/project_components/SavedEvent.vue'
import { ref, computed } from 'vue'
import SavedEventManager from '@/manager/saved_event_manager'

const hovered = ref(false)

const props = defineProps({
  name: String,
  id: String,
  events: Array,
  amountOfProjects: Number
})

const amountOfProjects = computed(
  () => SavedEventManager.all().filter((project) => project.status === props.id).length
)
</script>
