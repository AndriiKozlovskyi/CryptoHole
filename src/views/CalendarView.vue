<template>
  <div class="flex flex-row w-full justify-between h-full mb-3">
    <div class="flex flex-row mb-12">
      <Calendar @select-date="selectDate" />
    </div>
    <div class="flex flex-row space-x-2">
      <CalendarEventContainer :date="previousDate"/>

      <CalendarEventContainer :date="selectedDate ?? currentDate"/>

     <CalendarEventContainer :date="nextDate"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import Calendar from '@/components/calendar/Calendar.vue'
import CalendarEventContainer from '@/components/calendar/CalendarEventContainer.vue'
import DateUtils from '@/utils/date_utils'
import { computed, onBeforeMount, ref } from 'vue'

const currentDate = ref()
const previousDate = ref<{ date: Date; weekDay: string }>()
const selectedDate = ref<{ date: Date; weekDay: string }>()
const nextDate = ref<{ date: Date; weekDay: string }>()

onBeforeMount(() => {
  const date = new Date()
  const day = date.getDay()

  var yesterday = new Date(date.valueOf() - 1000 * 60 * 60 * 24)
  var tomorrow = new Date(date.valueOf() + 1000 * 60 * 60 * 24)


  previousDate.value = {
    date: yesterday,
    weekDay: DateUtils.converNumberToWeekDay(yesterday.getDay())
  }
  nextDate.value = { date: tomorrow, weekDay: DateUtils.converNumberToWeekDay(tomorrow.getDay()) }
  currentDate.value = { date: date, weekDay: DateUtils.converNumberToWeekDay(day) }
})

const selectDate = computed(() => (currentDate: Date, day: number) => {
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)

  var yesterday = new Date(date.valueOf() - 1000 * 60 * 60 * 24)
  var tomorrow = new Date(date.valueOf() + 1000 * 60 * 60 * 24)

  previousDate.value = {
    date: yesterday,
    weekDay: DateUtils.converNumberToWeekDay(yesterday.getDay())
  }
  nextDate.value = { date: tomorrow, weekDay: DateUtils.converNumberToWeekDay(tomorrow.getDay()) }

  selectedDate.value = { date: date, weekDay: DateUtils.converNumberToWeekDay(date.getDay()) }
})
</script>
