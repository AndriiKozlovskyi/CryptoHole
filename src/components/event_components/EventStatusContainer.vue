<template>
  <div
    class="flex bg-primary-item-color h-[100%] rounded-md flex-col w-min"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="sticky flex flex-row items-center text-secondary-text-color justify-between p-3">
      <p class="text-[14px] apple-font">{{ name }}</p>
      <p class="text-[14px] apple-font">{{ amountOfProjects }}</p>
    </div>
    <div class="space-y-2 mb-2 w-[16.25rem] px-3">
      <div
        class="relative top-0 left-0"
        v-for="event in events"
        :key="event.name"
      >
        <SavedEvent :id="event.id" />
      </div>
      <SavedEventCreationForm :status="id" v-if="creationFormVisible" @save="save" v-on-click-outside="hideCreationForm"/>
      <div 
        @click="createProject"
        class="flex flex-row apple-font hover:bg-[#4619bd] space-x-3 cursor-pointer items-center justify-center w-full h-[2rem] text-center text-white py-1" v-if="hovered">
        <i class="pi pi-plus"/>
        <p>create event</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SavedEvent from '@/components/event_components/SavedEvent.vue'
import { ref, computed } from 'vue'
import SavedEventManager from '@/manager/saved_event_manager'
import SavedEventCreationForm from "@/components/event_components/SavedEventCreationForm.vue";
import { vOnClickOutside } from '@vueuse/components'
import SavedEventModel from '@/models/saved_event_model';

const hovered = ref(false);

const props = defineProps({
  name: String,
  id: String,
  events: Array<SavedEventModel>,
  amountOfProjects: Number
});

const creationFormVisible = ref(false);

const save = () => {
  creationFormVisible.value = false;
}

const createProject = async () => {
  creationFormVisible.value = true; 
}

const hideCreationForm = () => {
  creationFormVisible.value = false;
}

const amountOfProjects = computed(
  () => SavedEventManager.all().filter((project) => project.status === props.id).length
)
</script>
