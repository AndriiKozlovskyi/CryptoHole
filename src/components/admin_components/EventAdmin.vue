<template>
  <div
    class="relative flex bg-primary-item-color hover:bg-hover-primary-item-color h-portrait-card rounded-lg group overflow-hidden basis-full h-[17.875rem] w-full flex-col tracking-tight cursor-pointer transition-[transform] active:scale-[0.99] group"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @click="handleClick"
  >
    <div class="h-[10rem] w-full grow relative flex">
      <img
        class="h-[100%] w-full rounded-t-lg object-cover opacity-[0.85] transition-all group-hover:scale-[1.02] group-hover:opacity-95"
        :src="event?.src" v-if="!isEditing"
      />
      <MyInput v-if="isEditing" class="w-[14.6rem] h-[2rem] m-auto z-[1]" v-model="src" @keyup.enter="save" type="url" pattern="https://.*" placeholder="Image of the event, ex: 'https://'"/>
    </div>
    <div class="absolute w-full flex flex-row items-start justify-between p-5">
      <div class="flex flex-col space-y-1">
        <Tag v-for="tag in event?.tags" :key="tag.id" :tag="tag.name" />
      </div>
    </div>
    <div class="absolute h-[10rem] w-full flex justify-end pr-5 mt-5">
      <div class="flex flex-col justify-between">
        <DeleteForm v-if="hovered" :event="event" @deleteEvent="removeEvent" />
        <EditForm v-if="hovered" :event="event" @click="isEditing = !isEditing"/>
        </div>
    </div>
    <div class="flex flex-col gap-2 mt-2 px-5">
      <div class="flex flex-row justify-between w-full rounded-full">
        <p class="text-white text-[17px] apple-font" v-if="!isEditing">
          {{ event?.name }}
        </p>
        <MyInput v-if="isEditing" class="w-[13.3rem] h-[2rem]" v-model="name" @keyup.enter="save" type="text" placeholder="Name of the event, ex: 'Drift'"/>
      </div>
      <hr class="w-full border-secondary-text-color opacity-25" />
      <div class="flex flex-row justify-between w-full mb-3 rounded-full">
        <ParticipantsForm :participants="event?.participants.length" />
          <AdminDatePicker
            :start-date="new Date(startDate)"
            :end-date="new Date(endDate)"
            v-model="dateRange"
            :is-editing="isEditing"
            @update:model-value="updateDateRange"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {PropType, ref} from 'vue'
import { useRouter } from 'vue-router'
import ParticipantsForm from '@/components/event_components/ParticipantsForm.vue'
import Tag from '@/components/event_components/Tag.vue'
import DeleteForm from './DeleteForm.vue'
import EditForm from './EditForm.vue'
import EventModule from '@/models/event_model'
import ToastManager from '@/manager/toaster_manager'
import { useToast } from 'primevue/usetoast'
import MyInput from '../basic_components/input/MyInput.vue'
import AdminDatePicker from '@/components/admin_components/AdminDatePicker.vue'
import EventManager from '@/manager/event_manager'

const router = useRouter()
const isEditing = ref(false);
const props = defineProps({
  event: Object as PropType<EventModule>
})

const hovered = ref(false)
const toast = useToast();
const dateRange = ref(null);
const startDate = ref(props.event.startDate);
const endDate = ref(props.event.endDate);
const src = ref(props.event.src);
const name = ref(props.event.name);

const save = async () => {
  const event = props.event;
  event.startDate = startDate.value;
  event.endDate = endDate.value;
  event.name = name.value;
  
  if (dateRange.value !== null) {
    event.startDate = dateRange.value[0];
    event.endDate = dateRange.value[1];
  }

  event.src = src.value;

  const _eventRequest = EventManager.eventResponseToEventRequest(event);

  emit('updateEvent', _eventRequest);
  isEditing.value = false
  ToastManager.showInfoToast(toast, "Event has been successfully edited")
};

const emit = defineEmits(['deleteEvent','updateEvent'])

const removeEvent = async (event) => {
  emit('deleteEvent', event)
  ToastManager.showInfoToast(toast, "Event has been successfully deleted")
}
const goToAdminEventDescription = () => {
  router.push({ name: 'admin_event_description', params: { id: props.event.id } })
}
const updateDateRange = async (newRange) => {
  dateRange.value = newRange;
}

const handleClick = () => {
  if(!isEditing.value) {
    goToAdminEventDescription()
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

.tag-bg {
  border-top-left-radius: 30%;
}
.font {
  font-family:
    Inter,
    Helvetica Rounded,
    Helvetica,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Helvetica Neue,
    Arial,
    Noto Sans,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji,
    Segoe UI Symbol,
    Noto Color Emoji;
  font-size: 20px;
}
.items-color {
  background: rgb(30, 31, 36);
}

.quest-image {
  -webkit-mask-image: linear-gradient(180deg, #000, transparent 99%);
  mask-image: linear-gradient(180deg, #000, transparent 99%);
}
.custom_datepicker {
  --dp-border-radius: 5px; 
  --dp-cell-border-radius: 5px;
}
</style>
