<template>
  <div class="flex flex-row justify-center w-full">
    <div class="w-full grid grid-cols-3 gap-10 overflow-y-hidden">
      <EventAdmin v-for="event in events" :event="event" :key="event.id" @deleteEvent="removeEvent(event)" @updateEvent="editEvent(event)"/>
      <CreateEventButton/>
      </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import EventAdmin from './EventAdmin.vue';
import EventManager from '@/manager/event_manager';
import CreateEventButton from './CreateEventButton.vue';

const events = computed(() => EventManager.all())

const removeEvent = async (event: Event) => {
  await EventManager.deleteEvent(event.id)
}
const editEvent = async (event: Event) => {
  const updateEventData = {
    name: event.name,
    image: event.props.src,
    expenses: event.expenses,
    tag: event.tags,
  }
  await EventManager.update(event.id, updateEventData)
}

</script>

<style>
::-webkit-scrollbar {
  margin-left: 12px;
  width: 6px;
  border-radius: 20px;
}


::-webkit-scrollbar-track {
  border-radius: 1px;
  width: 10px;
}


::-webkit-scrollbar-thumb {
  background: rgb(19, 25, 27);
  border-radius: 100px;
  width: 10px;
}


::-webkit-scrollbar-thumb:hover {
  background: #0a211a;
}
</style>
