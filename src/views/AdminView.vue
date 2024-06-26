<template>
  <div
    class="relative text-white w-full items-center justify-center flex overflow-hidden h-[23rem] flex-col rounded-lg"
  >
    <p>Create a project</p>
    <div class="flex flex-col mt-2 items-start px-5">
      <p>img link</p>
      <input class="text-black" type="text" v-model="imgSrc" />
    </div>

    <div class="flex flex-col mt-2 items-start px-5">
      <p>tag</p>
      <input class="text-black" type="text" v-model="tag" />
    </div>

    <div class="flex flex-col mt-2 items-start px-5">
      <p>name</p>
      <input type="text" class="text-black" v-model="name" />
    </div>
    <div class="flex flex-col mt-2 items-start px-5">
      <p>expenses</p>
      <input type="text" class="text-black" v-model="expenses" />
    </div>
    <button
      label="Save"
      class="bg-white mt-10 text-black text-lg text-center px-3 py-1 hover:bg-gray-500 rounded-lg"
      @click="save"
    >
      Save
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import LocalStorageManager from '@/manager/local_storage_manager'
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
  LocalStorageManager.addProject(project)
  ToastManager.showSuccessToast(toast, "You've created a project")
}

const deleteProj = (project: Project) => {
  LocalStorageManager.deleteProject(project)
  ToastManager.showInfoToast(toast, "You've deleted a project")
}
</script>
