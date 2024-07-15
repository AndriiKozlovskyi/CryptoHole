<template>
    <div class="flex flex-row w-full p-3 items-center rounded-t-md bg-hover-primary-item-color">
        <div class="flex flex-row w-1/3 justify-start">
            <div v-if="event.event === null" class="bg-blue-600 rounded-lg px-3 bg-opacity-80">                    
                <p class="apple-font text-white">Custom</p>
            </div>
            <div v-if="event.event !== null" class="flex flex-row cursor-pointer items-center space-x-3 bg-green-600 hover:bg-green-700 rounded-lg px-3 bg-opacity-80" @click=goToDescription>                    
                <p class="apple-font text-white">Go to description</p>
                <i class="text-white pi pi-external-link"/>
            </div>
        </div>
        <div class="flex flex-row w-1/3 justify-center">
            <p class="text-white text-[25px] apple-font">{{ event.name }}</p>
        </div>
        <div class="flex flex-row w-1/3 justify-end" @click="$emit('close')">
            <i class="text-secondary-text-color hover:text-gray-600 cursor-pointer pi pi-times" style="font-size: 1.2rem;" @click="$emit('close')"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import EventManager from '@/manager/event_manager';
import SavedEvent from '@/models/saved_event_model';
import { PropType } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    event: Object as PropType<SavedEvent>,
});

defineEmits(['close']);

const goToDescription = () => {
    const parentEvent = EventManager.getById(props.event.event);
    router.push({ name: 'event_description', params: { id: parentEvent.id } })
}
</script>