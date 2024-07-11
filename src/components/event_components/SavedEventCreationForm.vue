<template>
  <div
    class="flex bg-hover-primary-item-color h-[5.5rem] shadow-lg overflow-hidden w-full flex-col rounded-lg cursor-pointer transition-[transform] active:scale-[0.99] group"
    @keypress.enter="save"
  >
    <div class="flex flex-row justify-between">
      <div class="flex flex-col text-sm">
        <MyInput ref="creationRef" placeholder="Name" v-model="name" type="text" class="w-[7rem]" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import MyInput from '@/components/basic_components/input/MyInput.vue'
import { onMounted, ref, nextTick } from 'vue'
import SavedEventRequest from "@/dtos/requests/saved_event_request";
import SavedEventManager from '@/manager/saved_event_manager';

const props = defineProps({
  status: String
})

const creationRef = ref(null)

onMounted(async () => {
  await nextTick();

  creationRef.value.focus();
})

const name = ref('')

const emit = defineEmits(['save'])

const save = async () => {
  const event: SavedEventRequest = {
    name: name.value,
    status: props.status,
    orderNumber: 1,
    startDate: "",
    endDate: "",
  }

  emit('save');

  await SavedEventManager.createSavedEvent(event);
}
</script>
