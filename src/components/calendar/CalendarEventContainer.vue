<template>
  <div
    class="flex flex-col items-center text-secondary-text-color space-y-2 px-2 rounded-md bg-primary-item-color w-[16.25rem]"
  >
    <div
      class="sticky top-[12rem] flex flex-row w-full mt-2 text-secondary-text-color px-2 py-2 bg-primary-item-color justify-between"
    >
      <p class="text-[14px] apple-font">{{ date?.weekDay.toUpperCase() }}</p>
      <p class="text-[14px] apple-font"> {{ date?.date.toLocaleDateString() }}</p>
    </div>
    <div 
      class="flex flex-col space-y-2 w-full"
      v-for="event in SavedEventManager.getEventsByEndDate(date?.date)"
      :key="event.id"
    >
      <CalendarEvent
        :event="event"
        :date="getEndDate(event)"
        tip="ends"
      />
    </div>

    <div 
      class="flex flex-col space-y-2 w-full"
      v-for="event in SavedEventManager.getEventsByStartDate(date?.date)"
      :key="event.id"
    >
      <CalendarEvent
        :event="event"
        :date="getStartDate(event)"
        tip="starts"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import CalendarEvent from '@/components/calendar/CalendarEvent.vue'
import SavedEventManager from '@/manager/saved_event_manager'
import { PropType } from 'vue'

defineProps({
  date: Object as PropType<{ date: Date; weekDay: string }>
});

const getStartDate = (event) => {
  const startDate = new Date(String(event.startDate))
  const time = String(startDate.getHours()).padStart(2, '0') + ':' + String(startDate.getMinutes()).padStart(2, '0');
  return time
}

const getEndDate = (event) => {
  const endDate = new Date(String(event.endDate))
  const time = String(endDate.getHours()).padStart(2, '0') + ':' + String(endDate.getMinutes()).padStart(2, '0');
  return time
}
</script>
