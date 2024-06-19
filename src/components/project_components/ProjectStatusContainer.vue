<template>
	<div class="relative flex bg-primary-item-color h-[100%] items-start mb-12 rounded-md flex-col w-min"
		@mouseenter="hovered = true"
		@mouseleave="hovered = false" 
	>
	    <div class="flex flex-row items-center justify-between ">
			<p class="font-normal text-sm p-2">{{ name }}</p>
			<p class="px-3 text-gray-400">{{ amountOfProjects }}</p>
		</div>
		<DropZone :id="id"/>
	</div>
</template>
<script setup>
import DropZone from "@/components/draggable_containers/DropZone.vue";
import {ref} from "vue";

const hovered = ref(false);

const props = defineProps({
	name: String,
	id: String,
	amountOfProjects: Number,
});

</script>