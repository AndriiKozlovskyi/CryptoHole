<template>
	<div class="flex flex-col h-[10rem]">
		<div class="w-[5rem] flex flex-row space-x-2">
			<TabMenuItem name="Events" path="/home/events">
			</TabMenuItem>
			<TabMenuItem name="Calendar" path="/home/calendar">
				<i class="pi pi-calendar"/>
			</TabMenuItem>
			<TabMenuItem name="Managment" path="/home/managment">
				<i class="pi pi-cog"/>
			</TabMenuItem>
		</div>
	</div>
</template>
<script setup lang="ts">
import TabMenuItem from './TabMenuItem.vue';
</script>