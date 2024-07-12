<template>
  <div
    class="fixed flex flex-col px-3 py-2 shadow-xl space-y-3 w-[24rem] rounded-lg bg-primary-item-color h-[17rem]"
    @keypress.enter="save"
  >
    <div class="flex flex-row items-center justify-center">
      <p class="text-white apple-font">Edit Event</p>
    </div>
    <MyInput v-model="name" placeholder="event name" />
    <div class="flex flex-row justify-between text-secondary-text-color h-[2.5rem]">
      <MyButton
        v-if="!startDate"
        class="w-[9rem]"
        :class="{ [`inner-shadow`]: startSelecting }"
        text="select start date"
        @onClick="toggleDateSelection('start')"
      />
      <MyButton 
        v-if="startDate"
        class="flex hover:bg-[#4619bd] bg-[#4c12b2] apple-font items-center justify-center rounded-lg text-white cursor-pointer w-[9rem]"
        :class="{ [`inner-shadow`]: startSelecting }"
        @click="toggleDateSelection('start')"
        :text="startDateFormatted"
      />
      <MyButton
        v-if="!endDate"
        class="w-[9rem]"
        :class="{ [`inner-shadow`]: endSelecting }"
        text="select end date"
        @onClick="toggleDateSelection('end')"
      />
      <MyButton
        v-if="endDate"
        :class="{ [`inner-shadow`]: endSelecting }"
        class="flex items-center justify-center rounded-lg w-[9rem]"
        @click="toggleDateSelection('end')"
        :text="endDateFormatted"
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
import { ref, watch, computed, onBeforeMount } from 'vue'
import MyInput from '@/components/basic_components/input/MyInput.vue'
import TimePicker from '@/components/basic_components/TimePicker.vue'
import SavedEventManager from '@/manager/saved_event_manager'
import MyButton from '@/components/basic_components/MyButton.vue'
import { emitter } from '@/event_bus'
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  id: Number,
})

const event = computed(() => {
  return SavedEventManager.getById(props.id)
});

const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)
const name = ref(event.value.name)
const date = ref<Date | null>(null)

const startHour = ref(new Date(String(event.value?.startDate))?.getHours() || 12)
const startMinute = ref(new Date(String(event.value?.startDate))?.getMinutes() || 0)
const endHour = ref(new Date(String(event.value?.endDate))?.getHours() || 12)
const endMinute = ref(new Date(String(event.value?.endDate))?.getMinutes() || 0)

const startSelecting = ref(false)
const endSelecting = ref(false)

const startDateFormatted = computed(() => startDate.value?.toLocaleDateString() || '');
const endDateFormatted = computed(() => endDate.value?.toLocaleDateString() || '');

const initializeDate = (dateString: string | null) => {
  if (dateString) {
    const date = new Date(dateString);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  return null;
};

onBeforeMount(() => {
  startDate.value = initializeDate(event.value.startDate);
  endDate.value = initializeDate(event.value.endDate);
  emitter.on("changeSelectedDate", (selectedDate: Date) => { date.value = selectedDate });
});

watch(date, (newDate) => {
  if (startSelecting.value) {
    startDate.value = newDate;
  } 
  if (endSelecting.value) {
    endDate.value = newDate;
  }
});

watch(event, (newEvent) => {
  name.value = newEvent.name;
  startDate.value = initializeDate(newEvent.startDate);
  endDate.value = initializeDate(newEvent.endDate);

  const start = new Date(newEvent.startDate);
  startHour.value = start.getHours();
  startMinute.value = start.getMinutes();

  const end = new Date(newEvent.endDate);
  endHour.value = end.getHours();
  endMinute.value = end.getMinutes();
});

const updateStartHour = (newHour: number) => { startHour.value = newHour };
const updateStartMinute = (newMinute: number) => { startMinute.value = newMinute };
const updateEndHour = (newHour: number) => { endHour.value = newHour };
const updateEndMinute = (newMinute: number) => { endMinute.value = newMinute };

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const offset = -date.getTimezoneOffset();
  const offsetSign = offset >= 0 ? '+' : '-';
  const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
  const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
};

const toggleDateSelection = (type: 'start' | 'end') => {
  if (type === 'start') {
    startSelecting.value = !startSelecting.value;
    endSelecting.value = false;
  } else {
    endSelecting.value = !endSelecting.value;
    startSelecting.value = false;
  }
};

const save = async () => {
  const formattedStartDate = formatDate(new Date(
    startDate.value!.getFullYear(),
    startDate.value!.getMonth(),
    startDate.value!.getDate(),
    startHour.value,
    startMinute.value,
    0
  ));

  const formattedEndDate = endDate.value ? formatDate(new Date(
    endDate.value!.getFullYear(),
    endDate.value!.getMonth(),
    endDate.value!.getDate(),
    endHour.value,
    endMinute.value,
    0
  )) : '';

  await SavedEventManager.update(event.value.id, {
    name: name.value,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
    status: event.value.status,
    orderNumber: event.value.orderNumber,
  });
  emptyForm();
};

const emptyForm = () => {
  startDate.value = null;
  endDate.value = null;
  startHour.value = 12;
  startMinute.value = 0;
  endHour.value = 12;
  endMinute.value = 0;
  name.value = '';
  router.push({name: "calendar"});

};
</script>

<style>
.inner-shadow {
  box-shadow: rgb(16, 15, 24) 0px 3px 3px 0px inset;
}
</style>
