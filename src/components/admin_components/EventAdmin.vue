<template>
  <Toast />
  <div
    class="relative flex bg-primary-item-color hover:bg-hover-primary-item-color h-portrait-card rounded-lg group overflow-hidden basis-full h-[17.875rem] w-full flex-col tracking-tight cursor-pointer transition-[transform] active:scale-[0.99] group"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @click="!isEditing && goToAdminEventDescription"
  >
    <div class="h-[10rem] w-full grow relative flex">
      <img
        class="h-[100%] w-full rounded-t-lg object-cover opacity-[0.85] transition-all group-hover:scale-[1.02] group-hover:opacity-95"
        :src="event?.src" v-if="!isEditing"
      />
      <MyInput v-if="isEditing" class="w-[15.5rem] h-[2rem] m-auto z-[1]" v-model="event.src" @keyup.enter="save" type="url" pattern="https://.*" placeholder="Image of the event, ex: 'https://'"/>
    </div>
    <div class="absolute w-full flex flex-row items-start justify-between p-5">
      <div class="flex flex-col space-y-1">
        <Tag v-for="tag in event?.tags" :key="tag.id" :tag="tag.name" />
      </div>
    </div>
    <div class="absolute h-[10rem] w-full flex justify-end pr-5 mt-5">
      <div class="flex flex-col justify-between">
        <DeleteForm v-if="hovered" :event="event" @deleteEvent="removeEvent" />
        <EditForm v-if="hovered" :event="event" @click="isEditing = true"/>
        </div>
    </div>
    <div class="flex flex-col gap-2 mt-2 px-5">
      <div class="flex flex-row justify-between w-full rounded-full">
        <p class="text-white text-[17px] apple-font" v-if="!isEditing">
          {{ event?.name }}
        </p>
        <MyInput v-if="isEditing" class="w-[13.5rem] h-[2rem] text-center" v-model="event.name" @keyup.enter="save" type="text" placeholder="Name of the event, ex: 'Drift'"/>
        <div class="h-full flex items-center">
          <i class="pi pi-share-alt text-secondary-text-color" />
        </div>
      </div>
      <hr class="w-full border-secondary-text-color opacity-25" />
      <div class="flex flex-row justify-between w-full mb-3 rounded-full">
        <ParticipantsForm :participants="event?.participants.length" />
        <div class="flex items-center justify-center">
          <VueDatePicker v-model="calendarDates" range v-if="!isEditing" :dark="true" :class="calendar_theme" class="z-[1006]"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {PropType, ref, onMounted} from 'vue'
import { emitter } from '@/event_bus'
import { useRouter } from 'vue-router'
import ParticipantsForm from '@/components/event_components/ParticipantsForm.vue'
import Tag from '@/components/event_components/Tag.vue'
import DeleteForm from './DeleteForm.vue'
import EditForm from './EditForm.vue'
import EventModule from '@/models/event_model'
import ToastManager from '@/manager/toaster_manager'
import { useToast } from 'primevue/usetoast'
import MyInput from '../basic_components/input/MyInput.vue'
import VueDatePicker from '@vuepic/vue-datepicker';


const router = useRouter()
const isEditing = ref(false);
const props = defineProps({
  event: Object as PropType<EventModule>
})

const hovered = ref(false)
const toast = useToast();

const save = async () => {
    const event  = {
        name: props.event.name,
        src: props.event.src,
        startDate: props.event.startDate,
        endDate:props.event.endDate,
        tags:props.event.tags
    };
    emit('updateEvent', event)
    isEditing.value = false
};


const emit = defineEmits(['deleteEvent','updateEvent'])

const removeEvent = (event: Event) => {
  emit('deleteEvent', event)
  ToastManager.showInfoToast(toast, "Event has been successfully deleted")
}
const goToAdminEventDescription = () => {
  router.push({ name: 'admin_event_description', params: { id: props.event.id } })
}

const calendarDates = ref(new Date())

onMounted(() => {
  if (props.event?.startDate) {
    calendarDates.value = new Date(props.event.startDate)
  }

  emitter.on("changeSelectedDate", (date: Date) => {
    calendarDates.value = date
    selectedDayNumber.value = date.getDate();
  })
})


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

.calendar_theme {
    --dp-background-color: #212121;
    --dp-text-color: #fff;
    --dp-hover-color: #484848;
    --dp-hover-text-color: #fff;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #005cb2;
    --dp-primary-disabled-color: #61a8ea;
    --dp-primary-text-color: #fff;
    --dp-secondary-color: #a9a9a9;
    --dp-border-color: #2d2d2d;
    --dp-menu-border-color: #2d2d2d;
    --dp-border-color-hover: #aaaeb7;
    --dp-border-color-focus: #aaaeb7;
    --dp-disabled-color: #737373;
    --dp-disabled-color-text: #d0d0d0;
    --dp-scroll-bar-background: #212121;
    --dp-scroll-bar-color: #484848;
    --dp-success-color: #00701a;
    --dp-success-color-disabled: #428f59;
    --dp-icon-color: #959595;
    --dp-danger-color: #e53935;
    --dp-marker-color: #e53935;
    --dp-tooltip-color: #3e3e3e;
    --dp-highlight-color: rgb(0 92 178 / 20%);
    --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
    --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
    --dp-range-between-border-color: var(--dp-hover-color, #fff);
}

.dp__main {
  position: absolute;
  z-index: 9999;
}

.dp__outer_menu_wrap {
  position: fixed;
}
</style>
