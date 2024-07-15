<template>
  <div class="relative overscroll-y-none flex flex-col">
    <RouterView class="absolute"/>
    <div class="flex flex-col space-y-5">
      <div class="w-full flex flex-row gap-2 overflow-y-hidden" 
      >
        <ContextMenu :model="items" ref="contextMenu" />
        <EventStatusContainer
          v-for="status in statusContainers"
          :events="status.events"
          :key="status.id"
          :name="status.name"
          :id="status.id"
        />
      </div>
      <i
        class="fixed cursor-pointer right-4 bottom-4 text-white pi pi-question-circle"
        style="font-size: 2rem"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, computed, onMounted } from 'vue'
import EventStatusContainer from '@/components/event_components/EventStatusContainer.vue'
import SavedEventManager from '@/manager/saved_event_manager'
import { RouterView } from 'vue-router';
import ContextMenu from 'primevue/contextmenu'
import { emitter } from '@/event_bus';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();
const events = computed(() => SavedEventManager.all())

const todoEvents = computed(() => events.value.filter((event) => event.status === 'todo'))
const progressEvents = computed(() => events.value.filter((event) => event.status === 'progress'))
const waitingEvents = computed(() => events.value.filter((event) => event.status === 'waiting'))
const paidEvents = computed(() => events.value.filter((event) => event.status === 'paid'))
const failedEvents = computed(() => events.value.filter((event) => event.status === 'failed'))

const statusContainers = ref([
  { id: 'todo', name: 'TODO', events: todoEvents },
  { id: 'progress', name: 'DEPOSITED', events: progressEvents },
  { id: 'waiting', name: 'OBTAINED REWARDS', events: waitingEvents },
  { id: 'paid', name: 'MONETIZED', events: paidEvents },
  { id: 'failed', name: 'FAILED', events: failedEvents }
])

const isDragAvailable = ref(true)
provide('dragAvailable', isDragAvailable)

const contextMenu = ref(null)  // Declare the context menu ref
provide('contextMenu', contextMenu)

const eventIdForContextMenu = ref();

onMounted(() => {
  emitter.on("contextMenu", (value) => {
    eventIdForContextMenu.value = value
  })
})

const items = ref([
  { label: 'Delete', icon: 'pi pi-trash', command: async () => confirm1() }
])

const onDelete = async () => {
  await SavedEventManager.deleteSavedEvent(eventIdForContextMenu.value)
}

const confirm1 = () => {
    confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Save'
        },
        accept: async () => {
            await onDelete()
            toast.add({ severity: 'info', summary: 'Deleted', detail: 'You have deleted saved event', life: 3000 });
        },
        reject: () => {
        }
    });
};
</script>
