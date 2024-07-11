<template>
  <div :class="itemClass" @click="itemClicked">
    {{ day }}
    <div
      v-if="startEventsCount > 0 || endEventsCount > 0"
      class="shadow-xl shadow-black absolute mb-8 bg-opacity-200 mr-6 px-2 rounded-full text-white text-[14px] bg-[#436b3c]"

    >
    <!-- class="shadow-xl absolute mb-8 bg-opacity-70 mr-6 px-1 font-light rounded-full text-white text-[10px] bg-[#436b3c]" -->

      {{ startEventsCount + endEventsCount }}
    </div>
    <!-- <div
      v-if="endEventsCount > 0"
      class="shadow-xl absolute mb-8 ml-6 bg-opacity-70 px-1 font-light rounded-full text-white text-[10px] bg-[#8b3434]"
    >
      {{ endEventsCount }}
    </div> -->
  </div>
</template>

<script setup>
import { computed } from 'vue'
const emits = defineEmits(['onClick', 'changeMonth'])
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
  selected: {
    type: Boolean,
    default: false,
    required: true
  },
  endEventsCount: {
    type: Number,
    default: 0
  }
})

const itemClicked = () => {
  if (props.isOtherMonth) {
    emits('changeMonth')
  }
  emits('onClick')
}

const itemClass = computed(() => {
  let baseClass =
    'flex flex-col items-center cursor-pointer justify-center w-[2.5rem] h-[2.5rem] rounded-full m-2 font-bold hover:bg-[#4619bd]'
  if (props.isCurrentDay) {
    // baseClass += ' bg-[#6b6c72] text-white'
    baseClass += ' bg-white text-black'
  } else if (props.selected) {
    baseClass += ' text-white hover:bg-[#4619bd] bg-[#4c12b2] inner-shadow'
  } else if (props.isOtherMonth) {
    baseClass += ' text-gray-400'
  } else {
    baseClass += ' bg-hover-primary-item-color text-white'
  }
  return baseClass
})
</script>
<style>
.inner-shadow-calendar {
  /* box-shadow: rgb(16, 15, 24) 0px 0px 10px 5px inset; */
  box-shadow: rgb(139, 134, 134) 0px 0px 10px 5px inset;
}
</style>
