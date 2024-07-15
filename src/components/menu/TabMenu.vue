<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-row justify-between w-full">
      <div class="flex flex-row space-x-2 w-full">
        <TabMenuItem name="Events" path="/home/events"> </TabMenuItem>
        <TabMenuItem name="Calendar" path="/home/calendar">
          <i class="pi pi-calendar" />
        </TabMenuItem>
        <TabMenuItem name="Managment" path="/home/managment">
          <i class="pi pi-cog" />
        </TabMenuItem>
      </div>
      <!-- <Search class="self-center"/> -->

    </div>
  </div>
</template>
<script setup lang="ts">
import Search from '../basic_components/input/Search.vue';
import TabMenuItem from './TabMenuItem.vue'


</script>
