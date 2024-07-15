<template>
    <div class="flex flex-row">
      <select class="my-select apple-font bg-[#424149] bg-opacity-70 p-1 text-white hover:bg-[#35343a] cursor-pointer rounded-lg"
        id="status"
        v-model="selectedStatus"
        @change="updateValue"
        @click.stop
      >
        <option v-for="_status in statuses" :key="_status" :value="_status">
          {{ _status }}
        </option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const emit = defineEmits(['updateStatus']);
  
  const props = defineProps({
    status: String,
  });
  
  const statuses = [
    'todo',
    'deposited',
    'rewarded',
    'revenue',
    'failed'
  ];
  
  const selectedStatus = ref(props.status);
  
  const updateValue = () => {
    emit('updateStatus', selectedStatus.value);
  };
  

  </script>
  
  <style scoped>
  .my-select {
    outline: none;
  }
  </style>
  