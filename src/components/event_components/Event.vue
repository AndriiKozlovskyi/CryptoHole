<template>
  <div
    class="relative flex bg-primary-item-color hover:bg-hover-primary-item-color h-portrait-card rounded-lg group overflow-hidden basis-full h-[17.875rem] w-full flex-col tracking-tight cursor-pointer transition-[transform] active:scale-[0.99] group"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @click="goToProjectDescription"
  >
    <div class="h-[10rem] w-full grow">
      <img
        class="h-[100%] w-full rounded-t-lg object-cover opacity-[0.85] transition-all group-hover:scale-[1.02] group-hover:opacity-95"
        :src="event?.src"
      />
    </div>
    <div class="absolute w-full flex flex-row items-start justify-between p-5">
      <div class="flex flex-col space-y-1">
        <Tag v-for="tag in event?.tags" :key="tag.id" :tag="tag.name" />
      </div>
      <SaveButton
        v-if="hovered"
        :condition="event.saved && hovered"
        @save="save"
        @unsave="unsave"
      />
    </div>

    <div class="flex flex-col gap-2 mt-2 px-5">
      <div class="flex flex-row justify-between w-full rounded-full">
        <p class="text-white text-[17px] apple-font">
          {{ event?.name }}
        </p>
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ToastManager from '@/manager/toaster_manager'
import { useToast } from 'primevue/usetoast'
import ParticipantsForm from '@/components/event_components/ParticipantsForm.vue'
import Tag from '@/components/event_components/Tag.vue'
import SaveButton from '@/components/event_components/SaveButton.vue'
import EventManager from '@/manager/event_manager'
import SavedEventManager from '@/manager/saved_event_manager'

const toast = useToast()
const router = useRouter()
const props = defineProps({
  id: Number
})

const hovered = ref(false)

const event = computed(() => EventManager.getById(props.id))
const savedEvent = computed(() => SavedEventManager.getById(props.id))

const save = () => {
  if (event.value !== undefined) SavedEventManager.participateEvent(props.id)
  ToastManager.showSuccessToast(toast, "You've been successfully saved am event")
}

const unsave = () => {
  if (savedEvent.value !== undefined) SavedEventManager.unparticipateEvent(props.id)
  ToastManager.showSuccessToast(toast, "You've been successfully unsaved an event")
}

const goToProjectDescription = () => {
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
