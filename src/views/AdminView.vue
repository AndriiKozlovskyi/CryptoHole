<template>
  <Toast />
  <div class="h-full flex flex-col overflow-y-auto">
    <div class="flex flex-col items-center mt-[6rem]">
      <div class="flex flex-col items-center space-y-6">
        <p class="font-semibold text-2xl self-start text-white">All Projects</p>
        <div class="flex flex-row space-x-4">
          <AdminProjectContainer />
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '@/entity/Project'
import ToastManager from '@/manager/toaster_manager'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const name = ref('')
const expenses = ref(0)
const tag = ref('')
const imgSrc = ref('')

const save = () => {
  const project: Project = {
    name: name.value,
    tag: tag.value,
    expenses: expenses.value,
    src: imgSrc.value,
    participants: 0
  }
  ToastManager.showSuccessToast(toast, "You've created a project")
}

const deleteProj = (project: Project) => {
  ToastManager.showInfoToast(toast, "You've deleted a project")
}
</script>
