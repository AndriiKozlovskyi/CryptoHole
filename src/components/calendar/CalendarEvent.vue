<template>
	<div class="flex flex-col p-3 w-full rounded-lg bg-hover-primary-item-color h-[8rem]">
		<p class="text-white text-[14px] apple-font">{{ name }}</p>
		<p>10:00</p>
	</div>
</template>
<script setup lang="ts">
defineProps({
 name: String,
});
</script>