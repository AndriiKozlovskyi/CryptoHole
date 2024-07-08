<template>
    <div class="flex flex-col items-center">
      <div class="flex items-center">
        <button @click="changeMonth(-1)" class="absolute bg-[#1c1d20] text-white items-center justify-center px-1 shadow-lg rounded-full hover:bg-[#4619bd]">
            <i class="pi pi-angle-left"/>
        </button>
        <div class="flex flex-col items-start flex-grow">
            <div class="mt-4 text-xl ml-3 text-white font-bold apple-font">
            {{ currentYear }} - {{ currentMonthName }}
          </div>
          <div class="grid grid-cols-7 grid-rows-7 ">
            <div v-for="(day, index) in daysOfWeek" :key="index" class="text-secondary-text-color apple-font flex items-center justify-center">
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
              @click="$emit('selectDate', selectedDate, day.number)"
            />
          </div>
     
        </div>
        <button @click="changeMonth(1)" class="absolute ml-[23rem] bg-[#1c1d20] text-white px-1 shadow-lg rounded-full hover:bg-[#4619bd]">
            <i class="pi pi-angle-right"/>
        </button>
      </div>
    </div>  
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import CalendarItem from './CalendarItem.vue';
import SavedEventManager from "@/manager/saved_event_manager.ts"
import DateUtils from '@/utils/date_utils';

defineEmits(["selectDate"]);

const currentDate = ref(new Date());
const selectedDate = ref(new Date());

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
  const dateString = DateUtils.converDateToString(date);
  return SavedEventManager.getEventsByStartDate(dateString).length;
};

const getEndEventsCountForDate = (date) => {
  const dateString = DateUtils.converDateToString(date);
  return SavedEventManager.getEventsByEndDate(dateString).length;
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
  