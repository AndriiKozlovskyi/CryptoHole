<template>
  <div
    class="flex bg-hover-primary-item-color h-[5rem] shadow-lg overflow-hidden w-full flex-col rounded-lg cursor-pointer transition-[transform] active:scale-[0.99] group"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    v-on-click-outside="stopEditing"
    @keyup.enter="updateProject"
    @click="show"
  >
    <div class="flex flex-row space-x-2 px-3">
      <div v-if="!isEditing" class="apple-font text-white mt-1 text-[16px]">
        {{ event?.name }}
      </div>
      <i
        v-if="hovered && !isEditing"
        class="pi pi-pencil mt-2 text-white"
        @mousedown.stop
        @click="isEditing = true"
      />
      <MyInput
        v-if="isEditing"
        v-model="name"
        type="text"
        @focus.stop
        @mousedown.stop
        class="w-[9rem] apple-font mt-1 text-white text-[14px]"
      />
    </div>

    <div class="flex flex-row justify-between mt-3 space-y-1 ml-3">
      <div class="flex flex-row items-center space-x-2">
        <i class="pi pi-user secondary-text-color text-secondary-text-color" />
        <p class="text-[14px] text-white">{{ event?.accounts.length }}</p>
      </div>
      <Select class="mb-2 mr-3" @updateStatus="updateStatus" :status="event.status"/>
    </div>
  </div>
  <EditingSavedInfoView @close="showEventInfo = false" v-if="showEventInfo" :id="id"/>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import MyInput from '@/components/basic_components/input/MyInput.vue'
import { vOnClickOutside } from '@vueuse/components'
import SavedEventManager from '@/manager/saved_event_manager'
import Select from "@/components/basic_components/Select.vue";
import EditingSavedInfoView from "@/views/EditingSavedEventView.vue";


const props = defineProps({
  id: Number
})

const hovered = ref(false)
const event = computed(() => SavedEventManager.getById(props.id))
const name = ref(event.value?.name)

const isEditing = ref(false)
const showEventInfo = ref(false);

const show = () => {
  showEventInfo.value = true;
  console.log("sSSew")
}

const stopEditing = () => {
  isEditing.value = false
}

const updateStatus = (status: string) => {
  event.value.status = status;
  SavedEventManager.update(props.id, event.value)
}

const updateProject = () => {
  event.value.name = name.value
  SavedEventManager.update(props.id, event.value)
  isEditing.value = false
}
</script>
