<template>
  <div
    class="fixed flex flex-col px-3 py-2 shadow-xl space-y-3 w-[24rem] rounded-lg bg-primary-item-color h-[17rem]"
    @keypress.enter="save"
  >
    <div class="flex flex-row items-center justify-center">
      <p class="text-white apple-font">Create Event</p>
    </div>
    <MyInput v-model="name" placeholder="event name" />
    <div class="flex flex-row justify-between text-secondary-text-color h-[2.5rem]">
      <MyButton
        v-if="startDate == null"
        class="w-[9rem]"
        :class="{ [`inner-shadow`]: startSelecting }"
        text="select start date"
        @onClick="startSelecting = !startSelecting; endSelecting = false
        "
      />
      <MyButton 
        v-if="startDate != null"
        class="flex hover:bg-hover-purple bg-purple apple-font items-center justify-center rounded-lg text-white cursor-pointer w-[9rem]"
        :class="{ [`inner-shadow`]: startSelecting }"
        @click="startSelecting = true; endSelecting = false;"
        :text="startDate?.toLocaleDateString()"

      />
      <MyButton
        v-if="endDate == null"
        class="w-[9rem]"
        :class="{ [`inner-shadow`]: endSelecting }"
        text="select end date"
        @onClick="endSelecting = !endSelecting; startSelecting = false"
      />
      <MyButton
        v-if="endDate != null"
        :class="{ [`inner-shadow`]: endSelecting }"
        class="flex  items-center justify-center rounded-lg w-[9rem]"
        @click="startSelecting = false; endSelecting = true;"
        :text="endDate?.toLocaleDateString()"
      />
    </div>
    <div class="flex flex-row items-center text-white justify-between px-10">
      <TimePicker
        :hour="startHour"
        :minute="startMinute"
        @update:hour="updateStartHour"
        @update:minute="updateStartMinute"
      />
      <TimePicker
        :hour="endHour"
        :minute="endMinute"
        @update:hour="updateEndHour"
        @update:minute="updateEndMinute"
      />
    </div>
    <div class="flex flex-row justify-between">
      <MyButton text="Discard" class="bg-primary-item-color" @onClick="emptyForm" />
      <MyButton text="Save" class="bg-primary-item-color" @onClick="save" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import MyInput from '@/components/basic_components/input/MyInput.vue'
import TimePicker from '@/components/basic_components/TimePicker.vue'
import SavedEventManager from '@/manager/saved_event_manager'
import MyButton from '@/components/basic_components/MyButton.vue'
import { emitter } from '@/event_bus'
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  emitter.on("changeSelectedDate", (_date: Date) => {date.value = _date})
})

const date = ref();

const startHour = ref(12)
const startMinute = ref(0)

const endHour = ref(12)
const endMinute = ref(0)

const startDate = ref(null)
const endDate = ref(null)

const startSelecting = ref(false)
const endSelecting = ref(false)

watch(date,
  (newDate) => {
    if (!endSelecting.value) {
      startDate.value = newDate
    }
    else if (endSelecting.value) {
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

const save = async () => {
  let _endDate = "";
  if(endDate.value != null) {
    _endDate = formatDate(new Date(
        endDate.value?.getFullYear(),
        endDate.value?.getMonth(),
        endDate.value?.getDate(),
        endHour.value,
        endMinute.value,
        0
      ));
  }
  await SavedEventManager.createSavedEvent({
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
    rewardType: "",
    link: "",
    status: 'todo',
    orderNumber: 1,
    endDate: _endDate
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
  router.push({name: "calendar"});
}
</script>
<style>
.inner-shadow {
  box-shadow: rgb(16, 15, 24) 0px 3px 3px 0px inset;
}
</style>
