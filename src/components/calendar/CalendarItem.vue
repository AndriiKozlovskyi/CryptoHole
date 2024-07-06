<template>
    <div :class="itemClass">
      {{ day }}
      <div v-if="startEventsCount > 0" class="absolute mb-8 ml-6 px-2 rounded-full text-white text-sm bg-green-500">
        {{ startEventsCount }} 
      </div>
      <div v-if="endEventsCount > 0" class="absolute mb-8 mr-6 px-2 rounded-full text-white text-sm bg-red-500">
        {{ endEventsCount }} 
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    day: {
      type: [Number, String],
      required: true,
    },
    isCurrentDay: {
      type: Boolean,
      default: false,
    },
    isOtherMonth: {
      type: Boolean,
      default: false,
    },
    startEventsCount: {
      type: Number,
      default: 0,
    },
    endEventsCount: {
      type: Number,
      default: 0,
    },
  });
  
  const itemClass = computed(() => {
    let baseClass = 'flex flex-col items-center justify-center w-10 h-10 rounded-full m-1 font-bold';
    if (props.isCurrentDay) {
      baseClass += ' bg-purple-500 text-white';
    } else if (props.isOtherMonth) {
      baseClass += ' text-gray-400';
    } else {
      baseClass += ' bg-gray-200';
    }
    return baseClass;
  });
  </script>
  