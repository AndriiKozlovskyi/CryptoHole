<template>
  <div class="h-full flex items-center justify-center text-secondary-text-color font-medium text-[14px] space-x-1">
    <VueDatePicker
      v-model="dateRange"
      range
      :min-date="minDate"
      :max-date="maxDate"
      :dark="true"
      :teleport="true"
      :esc-close="true"
      :arrow-navigation="true"
      @update:modelValue="updateDateRange"
    >
      <template #trigger>
        <div class="cursor-pointer">
          <span class="mr-2">{{ formattedDateRange }}</span>
          <i class="pi pi-calendar"></i>
        </div>
      </template>
    </VueDatePicker>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import EventManager from '@/manager/event_manager';
import { emitter } from '@/event_bus';

const props = defineProps<{
  eventId: string;
  modelValue: [Date, Date];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: [Date, Date]): void;
}>();

const dateRange = ref<[Date, Date]>(props.modelValue);

const minDate = new Date();
const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

const formattedDateRange = computed(() => {
  if (dateRange.value) {
    const [start, end] = dateRange.value;
    return `${formatDateTime(start)} - ${formatDateTime(end)}`;
  }
  return 'Select date range';
});

function formatDateTime(date: Date): string {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`;
}

function updateDateRange(newRange: [Date, Date]) {
  dateRange.value = newRange;
  emit('update:modelValue', newRange);
  emitter.emit('changeSelectedDate', newRange[0]);
}

function setDefaultDateRange() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate());
  dateRange.value = [today, tomorrow];
  emit('update:modelValue', dateRange.value);
}

watch(() => props.eventId, (newEventId) => {
  const event = EventManager.getById(newEventId);
  if (event) {
    dateRange.value = [new Date(event.startDate), new Date(event.endDate)];
  } else {
    setDefaultDateRange();
  }
}, { immediate: true });

watch(() => props.modelValue, (newValue) => {
  if (newValue !== dateRange.value) {
    dateRange.value = newValue;
  }
}, { deep: true });

onMounted(() => {
  if (!dateRange.value[0] || !dateRange.value[1]) {
    setDefaultDateRange();
  }
});
</script>

<style scoped>
</style>