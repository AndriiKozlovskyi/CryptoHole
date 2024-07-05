<template>
  <div
    class="flex bg-hover-primary-item-color h-[8rem] shadow-lg overflow-hidden w-full flex-col rounded-lg cursor-pointer transition-[transform] active:scale-[0.99] group"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    v-on-click-outside="stopEditing"
    @keyup.enter="updateProject"
  >
    <div class="flex flex-row justify-between px-3">
      <div v-if="!isEditing" class="apple-font text-white mt-1 text-[16px]">
        {{ event?.name }}
      </div>
      <MyInput
        v-if="isEditing"
        v-model="name"
        type="text"
        @focus.stop
        @mousedown.stop
        class="w-[9rem] apple-font mt-1 text-white text-[14px]"
      />
      <i
        v-if="hovered && !isEditing"
        class="pi pi-pencil mt-3"
        @mousedown.stop
        @click="isEditing = true"
      />
    </div>

    <div class="flex flex-col mt-3 space-y-1 ml-3">
      <div class="flex flex-row items-center space-x-2">
        <i class="pi pi-user secondary-text-color" />
        <p v-if="!isEditing" class="text-[14px] text-white">{{ event?.accounts.length }}</p>
      </div>
      <div v-if="isEditing" class="flex flex-row space-x-2 items-center">
      </div>
      <div class="flex flex-row text-[14px] space-x-2 items-center">
        <i class="pi pi-clock" />
        <p class="w-[10rem] rounded-lg text-white">10h before</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import MyInput from '@/components/basic_components/input/MyInput.vue'
import { vOnClickOutside } from '@vueuse/components'
import SavedEventManager from '@/manager/saved_event_manager'

const props = defineProps({
  id: Number
});

const hovered = ref(false)
const event = computed(() => SavedEventManager.getById(props.id));
const name = ref(event.value?.name)

const isEditing = ref(false)

const emit = defineEmits(['dragSwitch'])

const stopEditing = () => {
  isEditing.value = false
}

const updateProject = () => {
  event.value.name = name.value
  SavedEventManager.update(props.id, event.value);
  isEditing.value = false
}

</script>
