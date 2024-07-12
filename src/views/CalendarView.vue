<template>
  <div class="flex flex-row w-full justify-between">
    <div class="realtive flex flex-col">
      <Calendar @select-date="selectDate"/>
      <div 
        class="fixed mt-[27rem] w-[24rem] rounded-lg hover:bg-[#4619bd] bg-[#4c12b2] px-3 py-2 cursor-pointer" 
        @click="createNewEvent"
        v-if="!creationViewVisible"
      >
        <p class="text-white apple-font text-center">Create Event</p>
      </div>

      <!-- <CreationCalendarEvent v-if="selected" class="mt-[29rem]" :date="selectedDate?.date" /> -->
      <RouterView class="mt-[27rem]"/>
    </div>
    <div class="relative flex flex-row space-x-2 h-[100%] overscroll-y-auto">
      <i class="text-white pi pi-angle-left fixed" @click="moveBackward"/>
      <CalendarEventContainer :date="previousDate" />
      <CalendarEventContainer :date="selectedDate ?? currentDate" />
      <CalendarEventContainer :date="nextDate" />
      <i class="text-white pi pi-angle-right fixed right-[8rem]" @click="moveForward"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import Calendar from '@/components/calendar/Calendar.vue'
import CalendarEventContainer from '@/components/calendar/CalendarEventContainer.vue'
import DateUtils from '@/utils/date_utils'
import { computed, onBeforeMount, ref } from 'vue'
import { emitter } from '@/event_bus'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();


const currentDate = ref()
const previousDate = ref<{ date: Date; weekDay: string }>()
const selectedDate = ref<{ date: Date; weekDay: string }>()
const nextDate = ref<{ date: Date; weekDay: string }>()
const selected = ref(false);

const creationViewVisible = computed(() => {
  return route.fullPath != '/home/calendar'
});

onBeforeMount(() => {
  const date = new Date()
  const day = date.getDay()

  previousDate.value = getPreviousDate(date);
  nextDate.value = getNextDate(date);
  currentDate.value = { date: date, weekDay: DateUtils.converNumberToWeekDay(day) }
})

const moveForward = () => {
  selectedDate.value = getNextDate(selectedDate.value?.date ?? currentDate.value.date);
  previousDate.value = getNextDate(previousDate.value?.date);
  nextDate.value = getNextDate(nextDate.value?.date);
  emitter.emit("changeSelectedDate", selectedDate.value.date);
}

const moveBackward = () => {
  selectedDate.value = getPreviousDate(selectedDate.value?.date ?? currentDate.value.date);
  previousDate.value = getPreviousDate(previousDate.value?.date);
  nextDate.value = getPreviousDate(nextDate.value?.date);
  emitter.emit("changeSelectedDate", selectedDate.value.date);
}

const selectDate = async (currentDate: Date, day: number) => {
  selected.value = true;
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)

  previousDate.value = getPreviousDate(date);
  nextDate.value = getNextDate(date);

  selectedDate.value = { date: date, weekDay: DateUtils.converNumberToWeekDay(date.getDay()) }
  emitter.emit("changeSelectedDate", selectedDate.value.date);
};

const createNewEvent = () => {
  router.push({name: "create_calendar_event"})
}

const getPreviousDate = (date: Date) => {
  const previousDate = new Date(date.valueOf() - 1000 * 60 * 60 * 24)
  return { date: previousDate, weekDay: DateUtils.converNumberToWeekDay(previousDate.getDay()) }

}
const getNextDate = (date: Date) => {
  const nextDate = new Date(date.valueOf() + 1000 * 60 * 60 * 24)
  return { date: nextDate, weekDay: DateUtils.converNumberToWeekDay(nextDate.getDay()) }
}
</script>
