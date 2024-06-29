<template>
  <i class="pi pi-trash text-white hover:text-red-500 absolute top-5 right-5 cursor-pointer duration-300 " @click.stop="deleteProject()" style="font-size: 1.5rem"></i>
</template>

<script setup lang="ts">
import LocalStorageManager from '@/manager/local_storage_manager'
import ToastManager from '@/manager/toaster_manager'
import { useToast } from 'primevue/usetoast'
import { PropType } from 'vue';
import type { Project } from '@/entity/Project'

const props = defineProps({
  project: Object as PropType<Project>
});

const toast = useToast()

const emit = defineEmits(['deleteProject'])

const deleteProject = () => {
  LocalStorageManager.deleteProject(props.project);
  ToastManager.showInfoToast(toast, "You've deleted a project");
  emit('deleteProject', props.project)
}
</script>