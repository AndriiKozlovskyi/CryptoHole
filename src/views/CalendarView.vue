<template>
  <div class="flex flex-row w-full justify-between h-full mb-3">
    <div class="flex flex-row mb-12">
      <Calendar @select-date="selectDate"/>
    </div>
    <div class="flex flex-row space-x-1">
      <div class="flex flex-col items-center text-secondary-text-color px-2 rounded-md bg-primary-item-color w-[16.25rem]">
        <div class="flex flex-row w-full text-secondary-text-color px-2 rounded-md bg-primary-item-color justify-between">
          <p class="text-[14px] mt-2 apple-font text-white">{{ previousDate?.weekDay }}</p>
          <p class="text-[14px] mt-2 apple-font text-white">{{ previousDate?.date }}</p>
        </div>
        <CalendarEvent v-for="event in SavedEventManager.getEventsByEndDate(previousDate?.date)" :key="event.id" :name="event.name"/>
        <CalendarEvent v-for="event in SavedEventManager.getEventsByStartDate(previousDate?.date)" :key="event.id" :name="event.name"/>      </div>

      <div class="flex flex-col items-center text-secondary-text-color px-2 rounded-md bg-primary-item-color w-[16.25rem]">
        <div class="flex flex-row w-full text-secondary-text-color px-2 rounded-md bg-primary-item-color justify-between">
          <p class="text-[14px] mt-2 apple-font text-white">{{ selectedDate?.weekDay ?? currentDate.weekDay }}</p>
          <p class="text-[14px] mt-2 apple-font text-white">{{ selectedDate?.date  ?? currentDate.date }}</p>
        </div> 
        <CalendarEvent v-for="event in SavedEventManager.getEventsByEndDate(selectedDate?.date)" :key="event.id" :name="event.name"/>
        <CalendarEvent v-for="event in SavedEventManager.getEventsByStartDate(selectedDate?.date)" :key="event.id" :name="event.name"/>

      </div>
      <div class="flex flex-col items-center text-secondary-text-color px-2 rounded-md bg-primary-item-color w-[16.25rem]">
        <div class="flex flex-row w-full text-secondary-text-color px-2 rounded-md bg-primary-item-color justify-between">
          <p class="text-[14px] mt-2 apple-font text-white">{{ nextDate?.weekDay }}</p>
          <p class="text-[14px] mt-2 apple-font text-white">{{ nextDate?.date }}</p>
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
const previousDate = ref<{date: string, weekDay: string}>();
const selectedDate = ref<{date: string, weekDay: string}>();
const nextDate = ref<{date: string, weekDay: string}>();


onBeforeMount(() => {
  const date = new Date();
  const day = date.getDay();

  var yesterday = new Date(date.valueOf() - 1000*60*60*24);
  var tomorrow = new Date(date.valueOf() + 1000*60*60*24);


  previousDate.value = {date: DateUtils.converDateToString(yesterday), weekDay: DateUtils.converNumberToWeekDay(yesterday.getDay())};
  nextDate.value = {date: DateUtils.converDateToString(tomorrow), weekDay: DateUtils.converNumberToWeekDay(tomorrow.getDay())};
  currentDate.value = {date: DateUtils.converDateToString(date), weekDay: DateUtils.converNumberToWeekDay(day)};
});



const selectDate = computed(() => (currentDate: Date, day: number) => {
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day+1);

  var yesterday = new Date(date.valueOf() - 1000*60*60*24);
  var tomorrow = new Date(date.valueOf() + 1000*60*60*24);

  previousDate.value = {date: DateUtils.converDateToString(yesterday), weekDay: DateUtils.converNumberToWeekDay(yesterday.getDay() - 2)};
  nextDate.value = {date: DateUtils.converDateToString(tomorrow), weekDay: DateUtils.converNumberToWeekDay(tomorrow.getDay() - 2)};

  const dateString = date.toISOString().split('T')[0];

  selectedDate.value = {date: dateString, weekDay: DateUtils.converNumberToWeekDay(date.getDay() - 2)};
});

</script>