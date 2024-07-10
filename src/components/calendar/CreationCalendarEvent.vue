<template>
  <div
    class="fixed flex flex-col px-3 py-2 shadow-xl space-y-3 w-[24rem] rounded-lg bg-primary-item-color h-[16rem]"
    @keypress.enter="save"
  >
    <div class="flex flex-row items-center justify-center">
      <p class="text-white apple-font">Create Event</p>
    </div>
    <MyInput v-model="name" placeholder="event name" />
    <div class="flex flex-row justify-between text-secondary-text-color">
      <div class="flex flex-col space-y-1 items-center">
        <MyButton
          v-if="startDate == null"
          :class="{ [`inner-shadow`]: startSelecting }"
          text="select start date"
          @onClick="startSelecting = !startSelecting; endSelecting = false
          "
        />
        <div 
        class="flex bg-hover-primary-item-color rounded-lg text-white cursor-pointer px-2"
        :class="{ [`inner-shadow`]: startSelecting }"
        @click="startSelecting = true; endSelecting = false;"
        >{{ startDate?.toLocaleDateString() }}</div>
        <div class="flex flex-row items-center space-y-2">
          <TimePicker
            :hour="startHour"
            :minute="startMinute"
            @update:hour="updateStartHour"
            @update:minute="updateStartMinute"
          />
        </div>
      </div>

      <div class="flex flex-col space-y-1 items-center">
        <MyButton
          v-if="endDate == null"
          :class="{ [`inner-shadow`]: endSelecting }"
          text="select end date"
          @onClick="endSelecting = !endSelecting; startSelecting = false"
        />
        <div
            :class="{ [`inner-shadow`]: endSelecting }"
            class="flex bg-hover-primary-item-color rounded-lg text-white cursor-pointer px-2"
            @click="startSelecting = false; endSelecting = true;"
        >{{ endDate?.toLocaleDateString() }}</div>

        <div class="flex flex-row items-center space-y-2">
          <TimePicker
            :hour="endHour"
            :minute="endMinute"
            @update:hour="updateEndHour"
            @update:minute="updateEndMinute"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <MyButton text="Discard" class="bg-primary-item-color" @onClick="emptyForm" />
      <MyButton text="Save" class="bg-primary-item-color" @onClick="save" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import MyInput from '@/components/basic_components/input/MyInput.vue'
import TimePicker from '@/components/basic_components/TimePicker.vue'
import SavedEventManager from '@/manager/saved_event_manager'
import MyButton from '../basic_components/MyButton.vue'

const props = defineProps({
  date: Date
})

const startHour = ref(12)
const startMinute = ref(0)

const endHour = ref(12)
const endMinute = ref(0)

const startDate = ref(props.date)
const endDate = ref(null)

const startSelecting = ref(false)
const endSelecting = ref(false)

watch(
  () => props.date,
  (newDate) => {
    if (!endSelecting.value) {
      startDate.value = newDate
    }
    if (endSelecting.value) {
      endDate.value = newDate
    }
  }
)

const updateStartHour = (newHour: number) => {
  startHour.value = newHour
}

const updateStartMinute = (newMinute: number) => {
  startMinute.value = newMinute
}

const updateEndHour = (newHour: number) => {
  endHour.value = newHour
}

const updateEndMinute = (newMinute: number) => {
  endMinute.value = newMinute
}

const name = ref()

function formatDate(date) {
    if(date === null) {
        return "";
    }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  // Get timezone offset in hours and minutes
  const offset = -date.getTimezoneOffset()
  const offsetSign = offset >= 0 ? '+' : '-'
  const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0')
  const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0')

  const timezone = `${offsetSign}${offsetHours}:${offsetMinutes}`

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}`
}

const save = () => {
  console.log(
    new Date(
      startDate.value?.getFullYear(),
      startDate.value?.getMonth(),
      startDate.value?.getDate(),
      startHour.value,
      startMinute.value,
      0
    )
  )

  SavedEventManager.createSavedEvent({
    name: name.value,
    startDate: formatDate(
      new Date(
        startDate.value?.getFullYear(),
        startDate.value?.getMonth(),
        startDate.value?.getDate(),
        startHour.value,
        startMinute.value,
        0
      )
    ),
    status: 'todo',
    orderNumber: 1,
    endDate: formatDate(
      new Date(
        endDate.value?.getFullYear(),
        endDate.value?.getMonth(),
        endDate.value?.getDate(),
        endHour.value,
        endMinute.value,
        0
      )
    )
  })
  emptyForm()
}

const emptyForm = () => {
  startDate.value = null
  endDate.value = null
  startMinute.value = null
  endMinute.value = null
  startHour.value = null
  endHour.value = null
  name.value = null
}
</script>
<style>
.inner-shadow {
  box-shadow: rgb(16, 15, 24) 0px 3px 3px 0px inset;
}
</style>
