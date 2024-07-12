<template>
  <div
    class="flex flex-col p-3 w-full shadow-xl justify-between cursor-pointer hover:scale-[1.02] rounded-lg bg-hover-primary-item-color h-[5rem]"
    @click="edit"
  >
    <div class="flex flex-row rounded-md justify-between">
      <div class="flex flex-row">
        <p class="text-white text-[14px] apple-font">{{ event?.name }}</p>
        <span v-if="tip == 'ends'" class="h-1 w-1 rounded-full bg-[#8b3434]"></span>
        <span v-if="tip == 'starts'" class="h-1 w-1 rounded-full bg-[#436b3c]"></span>
      </div>
      <i class="pi pi-external-link cursor-pointer" @click="goToEventManagment"/>
    </div>
    <div class="flex flex-row items-center space-x-3">
      <i v-if="tip == 'ends'" class="pi pi-clock" />
      <i v-if="tip == 'starts'" class="pi pi-clock" />

      <p>{{ date }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import SavedEvent from '@/models/saved_event_model'
import { PropType } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const props = defineProps({
  event: Object as PropType<SavedEvent>,
  tip: String,
  date: String
})

const goToEventManagment = () => {
  router.push({ name: 'event_info', params: { id: props.event.id } })
}

const edit = () => {
  router.push({ name: 'edit_calendar_event', params: { id: props.event.id } })
}

</script>
