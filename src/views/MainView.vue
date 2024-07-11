<template>
  <div class="h-full flex flex-col">
    <div class="flex flex-col items-center">
      <div class="flex flex-col w-full items-center space-y-6">
        <EventsContainer />
        <HelpButton />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import EventsContainer from '@/components/event_components/EventsContainer.vue'
import HelpButton from '@/components/HelpButton.vue'
</script>
<style>
.main-view {
  height: 100%;
}
</style>
