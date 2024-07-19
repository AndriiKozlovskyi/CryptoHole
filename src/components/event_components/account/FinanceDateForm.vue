<template>
  <td class="apple-font text-secondary-text-color text-[13px]">
      <VueDatePicker
          v-model="dateModel"
          :min-date="minDate"
          :max-date="maxDate"
          :dark="true"
          :teleport="true"
          :esc-close="false"
          :arrow-navigation="true"
          @update:modelValue="updateDate"
      >
      <template #trigger>
      <div class="cursor-pointer hover:bg-[#464852] rounded-md px-2">
        <span class="mr-2">{{ DateUtils.stringToDate(dateModel) }}</span>
      </div>
    </template>
  </VueDatePicker>
  </td>
</template>
<script lang="ts" setup>
import DateUtils from '@/utils/date_utils';
import { computed, ref } from 'vue';

const minDate = computed(() => {
  const currentYear = new Date().getFullYear();
  return new Date(currentYear, 0, 1); 
});

const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 5));

const props = defineProps({
    finance: Object
});

const dateModel = ref(props.finance.date);
const emit = defineEmits(['update'])

function updateDate() {
  const _finance = props.finance;
  _finance.date = DateUtils.formatDate(dateModel.value);
  emit('update', _finance);
}
</script>