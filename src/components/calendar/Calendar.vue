<template>
    <div class="flex flex-col items-center">
      <div class="flex items-center w-full max-w-md mb-4">
        <button @click="changeMonth(-1)" class="bg-[#4c12b2] text-white p-1 rounded-full">
            <i class="pi pi-angle-left"/>
        </button>
        <div class="flex flex-col items-center flex-grow">
            <div class="mt-4 text-xl text-white font-bold">
            {{ currentYear }} - {{ currentMonthName }}
          </div>
          <div class="grid grid-cols-7 grid-rows-7 gap-2">
            <div v-for="(day, index) in daysOfWeek" :key="index" class="text-white flex items-center justify-center font-bold">
              {{ day }}
            </div>
            <CalendarItem
              v-for="(day, index) in days"
              :key="index"
              :day="day.number"
              :isCurrentDay="day.isCurrentDay"
              :isOtherMonth="day.isOtherMonth"
              :startEventsCount="day.startEventsCount"
              :endEventsCount="day.endEventsCount"
            />
          </div>
     
        </div>
        <button @click="changeMonth(1)" class="bg-[#4c12b2] text-white p-1 rounded-full">
            <i class="pi pi-angle-right"/>
        </button>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import CalendarItem from './CalendarItem.vue';
import SavedEventManager from "@/manager/saved_event_manager.ts"
const currentDate = ref(new Date());
const selectedDate = ref(new Date());

const events = computed(() => SavedEventManager.all())

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonth = computed(() => currentDate.value.getMonth());
const currentMonthName = computed(() => currentDate.value.toLocaleString('default', { month: 'long' }));

const changeMonth = (delta) => {
  const newDate = new Date(currentYear.value, currentMonth.value + delta, 1);
  currentDate.value = newDate;

  if (new Date().getFullYear() === newDate.getFullYear() && new Date().getMonth() === newDate.getMonth()) {
    selectedDate.value = new Date();
  } else {
    selectedDate.value = newDate;
  }
};

const getStartEventsCountForDate = (date) => {
  const dateString = date.toISOString().split('T')[0];
  return events.value.filter(event => {
    const startDate: String = String(event.startDate);

    return startDate.startsWith(dateString)
    }).length;
};

const getEndEventsCountForDate = (date) => {
  const dateString = date.toISOString().split('T')[0];
  return events.value.filter(event => {
    const endDate: String = String(event.endDate);

    return endDate.startsWith(dateString)
    }).length;
};

const days = computed(() => {
  const daysArray = [];
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1).getDay();
  const adjustedFirstDay = (firstDayOfMonth + 6) % 7; // Adjust so Monday is the first day
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
  const previousMonthDays = new Date(currentYear.value, currentMonth.value, 0).getDate();

  // Add days from the previous month
  for (let i = adjustedFirstDay - 1; i >= 0; i--) {
    const date = new Date(currentYear.value, currentMonth.value - 1, previousMonthDays - i);
    daysArray.push({ number: previousMonthDays - i, isCurrentDay: false, isOtherMonth: true, eventsCount: getStartEventsCountForDate(date), endEventsCount: getEndEventsCountForDate(date)  });
  }

  // Add days from the current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i+1);
    const isCurrentDay = i === selectedDate.value.getDate() && new Date().getMonth() === currentMonth.value && new Date().getFullYear() === currentYear.value;
    daysArray.push({ number: i, isCurrentDay, isOtherMonth: false, startEventsCount: getStartEventsCountForDate(date), endEventsCount: getEndEventsCountForDate(date) });
  }

  // Add days from the next month
  for (let i = 1; daysArray.length < 42; i++) {
    const date = new Date(currentYear.value, currentMonth.value + 1, i+1);
    daysArray.push({ number: i, isCurrentDay: false, isOtherMonth: true, startEventsCount: getStartEventsCountForDate(date), endEventsCount: getEndEventsCountForDate(date)  });
  }
  return daysArray;
});
  </script>
  