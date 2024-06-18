<template>
	<div class="relative flex bg-[#141418] items-start h-min mb-12 rounded-xl flex-col w-min"
		@mouseenter="hovered = true"
		@mouseleave="hovered = false" 
		v-on-click-outside="closeCreationBar"
	>
		<p class="font-bold p-5">{{ name }}</p>

		<DropZone :id="id"/>
		<CreationBar :status="id" @save="closeCreationBar" class="ml-4 relative w-[16rem]" v-if="isCreationBarVisible"/>

		<div 
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
import {ref} from "vue";
import CreationBar from "./CreationBar.vue";
import { vOnClickOutside } from "@vueuse/components";

const hovered = ref(false);
const isCreationBarVisible = ref(false);

const showCreartionBar = () => {
	isCreationBarVisible.value = true;
}

const closeCreationBar = () => {
	isCreationBarVisible.value = false;
}
defineProps({
	name: String,
	id: String,
})
</script>