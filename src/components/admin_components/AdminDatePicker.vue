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
import { ref, computed, onMounted } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import EventManager from '@/manager/event_manager';
import { emitter } from '@/event_bus';

const props = defineProps<{
  id: number;
  modelValue: [Date, Date];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: [Date, Date]): void;
}>();

const dateRange = ref<[Date, Date]>(props.modelValue);

const minDate = computed(() => {
  const currentYear = new Date().getFullYear();
  return new Date(currentYear, 0, 1); 
});
const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 5));

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
  emitter.emit('adminDateRangeChanged', newRange);
}

onMounted(() => {
  emitter.on('calendarDateSelected', (date: Date) => {
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    dateRange.value = [date, endDate];
    emit('update:modelValue', dateRange.value);
  });
});

</script>

<style scoped>
</style>