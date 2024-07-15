<template>
  <div
    class="relative flex bg-primary-item-color hover:bg-hover-primary-item-color h-portrait-card rounded-lg group overflow-hidden basis-full h-[17.875rem] w-full flex-col tracking-tight cursor-pointer transition-[transform] active:scale-[0.99] group"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @click="goToAdminEventDescription"
  >
    <div class="h-[10rem] w-full grow relative">
      <img
        class="h-[100%] w-full rounded-t-lg object-cover opacity-[0.85] transition-all group-hover:scale-[1.02] group-hover:opacity-95"
        :src="event?.src"
      />
      <DeleteForm v-if="hovered" :event="event" @deleteEvent="removeEvent" />
      <EditForm v-if="hovered" :event="event" @click="isEditing = true"/>
    </div>
    <div class="absolute w-full flex flex-row items-start justify-between p-5">
      <div class="flex flex-col space-y-1">
        <Tag v-for="tag in event?.tags" :key="tag.id" :tag="tag.name" />
      </div>
    </div>

    <div class="flex flex-col gap-2 mt-2 px-5">
      <div class="flex flex-row justify-between w-full rounded-full">
        <p class="text-white text-[17px] apple-font" v-if="!isEditing">
          {{ event?.name }}
        </p>
        <input v-if="isEditing" v-model="event.name" @click.stop="emit('updateEvent')" @keyup.enter="save" type="text" placeholder="Name of the event"/>
        <div class="h-full flex items-center">
          <i class="pi pi-share-alt text-secondary-text-color" />
        </div>
      </div>
      <hr class="w-full border-secondary-text-color opacity-25" />
      <div class="flex flex-row justify-between w-full mb-3 rounded-full">
        <ParticipantsForm :participants="event?.participants.length" />
        <div
          class="h-full flex items-center text-secondary-text-color font-medium text-[14px] space-x-1"
        >
          <p>
            {{ new Date(event.startDate).toLocaleDateString() }} -
            {{ new Date(event.endDate).toLocaleDateString() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {PropType, ref } from 'vue'
import { useRouter } from 'vue-router'
import ParticipantsForm from '@/components/event_components/ParticipantsForm.vue'
import Tag from '@/components/event_components/Tag.vue'
import DeleteForm from './DeleteForm.vue'
import EditForm from './EditForm.vue'
import EventModule from '@/models/event_model'

const router = useRouter()
const isEditing = ref(false);
const props = defineProps({
  event: Object as PropType<EventModule>
})

const hovered = ref(false)

const save = async () => {
    const event  = {
        name: props.event.name,
        src: props.event.src,
        expenses: props.event.expenses,
    };
    emit('updateEvent', event)
    isEditing.value = false
};


const emit = defineEmits(['deleteEvent','updateEvent'])

const removeEvent = (event: Event) => {
  emit('deleteEvent', event)
}
const goToAdminEventDescription = () => {
  router.push({ name: 'event_description', params: { id: event.value.id } })
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
</style>
