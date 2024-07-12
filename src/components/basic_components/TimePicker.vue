<template>
  <div class="flex items-center justify-center space-x-2" v-on-click-outside="stopEdit">
    <div class="flex flex-col items-center">
      <button @click="incrementHour" class="text-[14px] font-bold">
        <i class="pi pi-angle-up" />
      </button>
      <div class="text-[14px] font-mono" @click="edit" v-if="!isEditing">{{ formattedHour }}</div>
      <input 
        class="w-[1.1rem] text-[14px] text-center font-mono time-picker-input text-white rounded-md bg-hover-primary-item-color" 
        v-model="hour" 
        v-if="isEditing"
        type="number"
      />
      <button @click="decrementHour" class="text-[14px] font-bold">
        <i class="pi pi-angle-down" />
      </button>
    </div>
    <div class="text-[14px] font-mono">:</div>
    <div class="flex flex-col items-center">
      <button @click="incrementMinute" class="text-[14px] font-bold">
        <i class="pi pi-angle-up" />
      </button>
      <div class="text-[14px] font-mono" @click="edit" v-if="!isEditing">{{ formattedMinute }}</div>
      <input 
        v-model="minute" 
        class="text-[14px] font-mono w-[1.1rem] text-center rounded-md time-picker-input text-white bg-hover-primary-item-color" 
        v-if="isEditing"
        type="number"
      />
      <button @click="decrementMinute" class="text-[14px] font-bold">
        <i class="pi pi-angle-down" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { vOnClickOutside } from '@vueuse/components'

const emit = defineEmits(['update:hour', 'update:minute'])
const props = defineProps({
  hour: Number,
  minute: Number
})
const hour = ref(props.hour);
const minute = ref(props.minute);

const formattedHour = computed(() => String(hour.value).padStart(2, '0'))
const formattedMinute = computed(() => String(minute.value).padStart(2, '0'))

const edit = () => {
  isEditing.value = true;
}

const stopEdit = () => {
  isEditing.value = false;
}

const isEditing = ref(false);

watch(() => props.hour, (newHour) => {
  hour.value = newHour;
});

watch(() => props.minute, (newMinute) => {
  minute.value = newMinute;
});


watch(hour, (newHour) => {
  emit('update:hour', newHour)
});

watch(minute, (newMinute) => {
  emit('update:minute', newMinute)
});

const incrementHour = () => {
  hour.value = (hour.value + 1) % 24
  emit('update:hour', hour.value)
}

const decrementHour = () => {
  hour.value = (hour.value - 1 + 24) % 24
  emit('update:hour', hour.value)
}

const incrementMinute = () => {
  minute.value = (minute.value + 1) % 60
  emit('update:minute', minute.value)
}

const decrementMinute = () => {
  minute.value = (minute.value - 1 + 60) % 60
  emit('update:minute', minute.value)
}
</script>
<style>
.time-picker-input {
  outline: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
