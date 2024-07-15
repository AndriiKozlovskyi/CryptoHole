<template>
  <div class="flex flex-col h-[10rem]" v-if="!isDisabled">
    <div class="w-[5rem] flex flex-row space-x-2">
      <TabMenuItem name="Events" path="/admin/event_management" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TabMenuItem from '../menu/TabMenuItem.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const isDisabled = computed(() => {
  return route.path === "/admin/create_event";
});

</script>
