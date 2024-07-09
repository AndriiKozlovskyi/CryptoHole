<template>
  <div :class="itemClass">
    {{ day }}
    <div
      v-if="startEventsCount > 0"
      class="shadow-xl absolute mb-8 bg-opacity-50 mr-6 px-2 font-light rounded-full text-white text-sm bg-[#436b3c]"
    >
      {{ startEventsCount }}
    </div>
    <div
      v-if="endEventsCount > 0"
      class="shadow-xl absolute mb-8 ml-6 bg-opacity-50 px-2 font-light rounded-full text-white text-sm bg-[#8b3434]"
    >
      {{ endEventsCount }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  day: {
    type: [Number, String],
    required: true
  },
  isCurrentDay: {
    type: Boolean,
    default: false
  },
  isOtherMonth: {
    type: Boolean,
    default: false
  },
  startEventsCount: {
    type: Number,
    default: 0
  },
  endEventsCount: {
    type: Number,
    default: 0
  }
})

const itemClass = computed(() => {
  let baseClass =
    'flex flex-col items-center justify-center w-10 h-10 rounded-full m-2 font-bold hover:bg-[#4619bd]'
  if (props.isCurrentDay) {
    baseClass += ' bg-[#6b6c72] text-white'
  } else if (props.isOtherMonth) {
    baseClass += ' text-gray-400'
  } else {
    baseClass += ' bg-hover-primary-item-color text-white'
  }
  return baseClass
})
</script>
