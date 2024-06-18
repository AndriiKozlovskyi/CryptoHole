<template>
	<div class="relative flex bg-[#141418] h-[100%] items-start mb-12 rounded-xl flex-col w-min"
		@mouseenter="hovered = true"
		@mouseleave="hovered = false" 
	>
	    <div class="flex flex-row items-center justify-between ">
              <p class="font-normal text-sm p-2">{{name}}</p>
              <p class="px-3 text-gray-400">{{ amountOfProjects }}</p>
            </div>
		<DropZone :id="id">
		</DropZone>

		<CreationBar id="creation"
		 :status="id" 
		 @save="closeCreationBar" 
		 class="relative w-[16.25rem]" 
		 v-if="isCreationBarVisible"
		 v-on-click-outside="closeCreationBar"

		 />

<div 
	id="add"
	:class="hovered ? 'opacity-1' : 'opacity-0'" 
	class="relative mr-4 mb-5 flex flex-row py-3 px-3 items-center space-x-3 bottom-2 cursor-pointer rounded-lg ml-4 bg-[#181a1d]"
	@click="showCreartionBar()"
	v-if="!isCreationBarVisible"
>
	<i class="pi pi-plus text-white" style="font-size: 1.5rem; font-weight: 900;"/>
	<p class="">Add my project</p>
</div>
</div>

</template>
<script setup>
import DropZone from "@/components/DropZone.vue";
import {onMounted, ref} from "vue";
import CreationBar from "./CreationBar.vue";
import { vOnClickOutside } from "@vueuse/components";

const hovered = ref(false);
const isCreationBarVisible = ref(false);

const props = defineProps({
	name: String,
	id: String,
	amountOfProjects: Number,
})


const showCreartionBar = () => {
	isCreationBarVisible.value = true;
}

const closeCreationBar = () => {
	isCreationBarVisible.value = false;
}

</script>