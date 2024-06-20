<template>
    <div class="flex flex-row space-x-3 items-center">
        <img class="rounded-full" width="28px" height="28px" src="https://masterpiecer-images.s3.yandex.net/65782260a05d11eebe3ad20dae950626:upscaled"/>
        <div class="flex flex-col">
            <p class="text-[14px] text-white">
                {{participants}}K
            </p>
            <p class="text-[12px] text-secondary-text-color">
                Participants
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    participants: Number
});
</script>