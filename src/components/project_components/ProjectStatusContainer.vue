<template>
	<div class="relative flex bg-primary-item-color h-[100%] items-start rounded-md flex-col w-min"
		@mouseenter="hovered = true"
		@mouseleave="hovered = false" 
	>
	    <div class="flex flex-row apple-font items-center text-secondary-text-color justify-between">
			<p class="text-[14px] p-2">{{ name }}</p>
			<p class="px-3">{{ amountOfProjects }}</p>
		</div>
		<DropZone :id="id"/>
	</div>
</template>
<script setup>
import DropZone from "@/components/draggable_containers/DropZone.vue";
import {ref} from "vue";

const hovered = ref(false);

defineProps({
	name: String,
	id: String,
	amountOfProjects: Number,
});

</script>