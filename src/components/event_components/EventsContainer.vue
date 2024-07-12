<template>
  <div class="flex flex-row justify-center w-full">
    <div class="w-full grid grid-cols-3 gap-10 overflow-y-hidden">
      <EventBox v-for="event in events" :key="event.name" :id="event.id" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import EventBox from '@/components/event_components/EventBox.vue'
import EventManager from '@/manager/event_manager'

const events = computed(() => EventManager.all())
</script>

<style>
::-webkit-scrollbar {
  margin-left: 12px;
  width: 6px;
  border-radius: 20px;
}

::-webkit-scrollbar-track {
  border-radius: 1px;
  width: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(19, 25, 27);
  border-radius: 100px;
  width: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #0a211a;
}
</style>
