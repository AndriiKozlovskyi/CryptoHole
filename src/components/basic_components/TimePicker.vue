<template>
    <div class="flex items-center justify-center space-x-4 p-4">
      <div class="flex flex-col items-center">
        <button @click="incrementHour" class="text-[14px] font-bold">
            <i class="pi pi-angle-up"/>
        </button>
        <div class="text-[14px]  font-mono">{{ formattedHour }}</div>
        <button @click="decrementHour" class="text-[14px]  font-bold">
            <i class="pi pi-angle-down"/>
        </button>
      </div>
      <div class="text-[14px]  font-mono">:</div>
      <div class="flex flex-col items-center">
        <button @click="incrementMinute" class="text-[14px] font-bold">
            <i class="pi pi-angle-up"/>
        </button>
        <div class="text-[14px] font-mono">{{ formattedMinute }}</div>
        <button @click="decrementMinute" class="text-[14px] font-bold">
            <i class="pi pi-angle-down"/>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const emit = defineEmits(['update:hour', 'update:minute']);
  const props = defineProps({
    hour: Number,
    minute: Number
  });
  const hour = ref(props.hour);
  const minute = ref(props.minute);
  
  const formattedHour = computed(() => String(hour.value).padStart(2, '0'));
  const formattedMinute = computed(() => String(minute.value).padStart(2, '0'));
  
  const incrementHour = () => {
    hour.value = (hour.value + 1) % 24;
    emit('update:hour', hour.value);
  };
  
  const decrementHour = () => {
    hour.value = (hour.value - 1 + 24) % 24;
    emit('update:hour', hour.value);
  };
  
  const incrementMinute = () => {
    minute.value = (minute.value + 1) % 60;
    emit('update:minute', minute.value);
  };
  
  const decrementMinute = () => {
    minute.value = (minute.value - 1 + 60) % 60;
    emit('update:minute', minute.value);
  };
  </script>
  