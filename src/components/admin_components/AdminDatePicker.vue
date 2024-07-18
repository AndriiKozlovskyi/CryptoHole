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
import { ref, computed } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import DateUtils from '@/utils/date_utils';

const props = defineProps({
  modelValue: Array<Date>,
  startDate: String,
  endEnd: String,
})

const emit = defineEmits(['update:modelValue'])

const dateRange = ref(props.modelValue);

const minDate = computed(() => {
  const currentYear = new Date().getFullYear();
  return new Date(currentYear, 0, 1); 
});
const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 5));

const formattedDateRange = computed(() => {
  if (props.startDate === null || props.endEnd === null) {
    return `${DateUtils.formatDate(dateRange.value[0])} - ${DateUtils.formatDate(dateRange.value[1])}`;
  }
  return 'Select date range';
});

function updateDateRange(newRange: [Date, Date]) {
  const range = [];
  range[0] = DateUtils.formatDate(newRange[0])
  range[1] = DateUtils.formatDate(newRange[1])
  emit('update:modelValue', range);
}

</script>

<style scoped>
</style>