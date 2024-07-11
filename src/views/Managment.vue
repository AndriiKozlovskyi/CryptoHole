<template>
  <div class="relative overscroll-y-none flex flex-col">
    <RouterView class="absolute"/>
    <div class="flex flex-col space-y-5">
      <div class="w-full flex flex-row gap-2 overflow-y-hidden">
        <EventStatusContainer
          v-for="status in statusContainers"
          :events="status.events"
          :key="status.id"
          :name="status.name"
          :id="status.id"
        />
      </div>
      <i
        class="fixed cursor-pointer right-4 bottom-4 text-white pi pi-question-circle"
        style="font-size: 2rem"
      />
    </div>
  </div>
</template>

<script setup>
import { provide, ref, computed } from 'vue'
import EventStatusContainer from '@/components/event_components/EventStatusContainer.vue'
import SavedEventManager from '@/manager/saved_event_manager'
import { RouterView } from 'vue-router';
const events = computed(() => SavedEventManager.all())

const todoEvents = computed(() => events.value.filter((event) => event.status === 'todo'))
const progressEvents = computed(() => events.value.filter((event) => event.status === 'progress'))
const waitingEvents = computed(() => events.value.filter((event) => event.status === 'waiting'))
const paidEvents = computed(() => events.value.filter((event) => event.status === 'paid'))
const failedEvents = computed(() => events.value.filter((event) => event.status === 'failed'))

const statusContainers = ref([
  { id: 'todo', name: 'TODO', events: todoEvents },
  { id: 'progress', name: 'IN PROGRESS', events: progressEvents },
  { id: 'waiting', name: 'WAITING FOR PAYMENT', events: waitingEvents },
  { id: 'paid', name: 'PAID', events: paidEvents },
  { id: 'failed', name: 'FAILED', events: failedEvents }
])

const isDragAvailable = ref(true)
provide('dragAvailable', isDragAvailable)
</script>
