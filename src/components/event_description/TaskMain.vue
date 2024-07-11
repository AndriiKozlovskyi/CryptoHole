<template>
  <section class="flex items-stretch text-secondary-text-color">
    <div
      class="bg-[#1e1f24] text-white font-extrabold h-20 min-w-20 text-3xl flex items-center justify-center rounded-full z-10"
    >
      {{ taskNumber }}
    </div>
    <div class="flex flex-col ml-3">
      <h2 class="font-bold text-xl mb-2 mt-2 text-white">{{ taskTitle }}</h2>
      <ul class="list-decimal ml-10 flex flex-col space-y-2">
        <li v-for="(item, index) in taskDescriptionArray" :key="index">{{ item.trim() }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  taskNumber: Number,
  taskTitle: String,
  taskDescription: String
})

const taskDescriptionArray = computed(() => props.taskDescription.split(','))
</script>
