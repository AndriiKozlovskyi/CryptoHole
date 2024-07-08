<template>
  <div class="flex flex-row w-full justify-between h-full mb-3">
    <div class="flex flex-row mb-12">
      <Calendar @select-date="selectDate"/>
    </div>
    <div class="flex flex-row space-x-1">
      <div class="flex flex-col items-center text-secondary-text-color px-2 rounded-md bg-primary-item-color w-[16.25rem]">
        <div class="flex flex-row w-full text-secondary-text-color px-2 rounded-md bg-primary-item-color justify-between">
          <p class="text-[14px] mt-2 apple-font text-white">{{ previousDate?.weekDay }}</p>
          <p class="text-[14px] mt-2 apple-font text-white">{{ previousDate?.date.toLocaleDateString() }}</p>
        </div>
        <CalendarEvent v-for="event in SavedEventManager.getEventsByEndDate(previousDate?.date)" :key="event.id" :name="event.name"/>
        <CalendarEvent v-for="event in SavedEventManager.getEventsByStartDate(previousDate?.date)" :key="event.id" :name="event.name"/>      </div>

      <div class="flex flex-col items-center text-secondary-text-color px-2 rounded-md bg-primary-item-color w-[16.25rem]">
        <div class="flex flex-row w-full text-secondary-text-color px-2 rounded-md bg-primary-item-color justify-between">
          <p class="text-[14px] mt-2 apple-font text-white">{{ selectedDate?.weekDay ?? currentDate.weekDay }}</p>
          <p class="text-[14px] mt-2 apple-font text-white">{{ selectedDate?.date.toLocaleDateString()   ?? currentDate.date.toLocaleDateString()  }}</p>
        </div> 
        <CalendarEvent v-for="event in SavedEventManager.getEventsByEndDate(selectedDate?.date)" :key="event.id" :name="event.name"/>
        <CalendarEvent v-for="event in SavedEventManager.getEventsByStartDate(selectedDate?.date)" :key="event.id" :name="event.name"/>

      </div>
      <div class="flex flex-col items-center text-secondary-text-color px-2 rounded-md bg-primary-item-color w-[16.25rem]">
        <div class="flex flex-row w-full text-secondary-text-color px-2 rounded-md bg-primary-item-color justify-between">
          <p class="text-[14px] mt-2 apple-font text-white">{{ nextDate?.weekDay }}</p>
          <p class="text-[14px] mt-2 apple-font text-white">{{ nextDate?.date.toLocaleDateString()  }}</p>
        </div>
        <CalendarEvent v-for="event in SavedEventManager.getEventsByEndDate(nextDate?.date)" :key="event.id" :name="event.name"/>
        <CalendarEvent v-for="event in SavedEventManager.getEventsByStartDate(nextDate?.date)" :key="event.id" :name="event.name"/>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Calendar from "@/components/calendar/Calendar.vue"
import CalendarEvent from '@/components/calendar/CalendarEvent.vue';
import SavedEventManager from "@/manager/saved_event_manager";
import DateUtils from "@/utils/date_utils";
import { computed, onBeforeMount, ref } from "vue";


const currentDate = ref();
const previousDate = ref<{date: Date, weekDay: string}>();
const selectedDate = ref<{date: Date, weekDay: string}>();
const nextDate = ref<{date: Date, weekDay: string}>();


onBeforeMount(() => {
  const date = new Date();
  const day = date.getDay();

  var yesterday = new Date(date.valueOf() - 1000*60*60*24);
  var tomorrow = new Date(date.valueOf() + 1000*60*60*24);

  console.log(yesterday)

  previousDate.value = {date: yesterday, weekDay: DateUtils.converNumberToWeekDay(yesterday.getDay())};
  nextDate.value = {date: tomorrow, weekDay: DateUtils.converNumberToWeekDay(tomorrow.getDay())};
  currentDate.value = {date: date, weekDay: DateUtils.converNumberToWeekDay(day)};
});



const selectDate = computed(() => (currentDate: Date, day: number) => {
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

  var yesterday = new Date(date.valueOf() - 1000*60*60*24);
  var tomorrow = new Date(date.valueOf() + 1000*60*60*24);

  previousDate.value = {date: yesterday, weekDay: DateUtils.converNumberToWeekDay(yesterday.getDay())};
  nextDate.value = {date: tomorrow, weekDay: DateUtils.converNumberToWeekDay(tomorrow.getDay())};

  selectedDate.value = {date: date, weekDay: DateUtils.converNumberToWeekDay(date.getDay())};
});

</script>