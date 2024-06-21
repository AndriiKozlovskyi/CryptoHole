<template>
  <Toast />
  <div
    class="relative flex bg-primary-item-color hover:bg-hover-primary-item-color h-portrait-card group overflow-hidden w-full basis-full h-[20rem] flex-col rounded-lg tracking-tight cursor-pointer transition-[transform] active:scale-[0.99] group"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @click="goToProjectDescritpion"
  >
    <div class="h-[10rem] w-full grow">
      <img
        class="h-[100%] w-full rounded-t-lg object-cover opacity-[0.85] transition-all group-hover:scale-[1.02] group-hover:opacity-95"
        :src="project?.src"
      />
    </div>
    <div class="absolute w-full flex flex-row justify-between p-5">
      <Tag :tag="project?.tag" />
      <SaveButton v-if="hovered" :condition="saved && hovered" @save="save" @unsave="unsave" />
    </div>

    <div class="flex flex-col gap-5 mt-2 px-5">
      <p class="text-white text-[20px]">
        {{ project?.name }}
      </p>
      <hr class="w-full border-secondary-text-color opacity-25" />
      <div class="flex flex-row justify-between w-full mb-5 rounded-full">
        <ParticipantsForm :participants="project?.participants" />
        <ExpensesForm :expenses="project?.expenses" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LocalStorageManager from '@/manager/local_storage_manager'
import { onBeforeMount, ref } from 'vue'
import type { Project } from '@/entity/Project'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import ToastManager from '@/manager/toaster_manager'
import { useToast } from 'primevue/usetoast'
import ExpensesForm from '@/components/project_components/ExpensesForm.vue'
import ParticipantsForm from '@/components/project_components/ParticipantsForm.vue'
import Tag from '@/components/project_components/Tag.vue'
import SaveButton from '@/components/project_components/SaveButton.vue'

const toast = useToast()

const router = useRouter()

const props = defineProps({
  project: Object as PropType<Project>
})
const saved = ref(false)
const hovered = ref(false)

onBeforeMount(() => {
  saved.value = LocalStorageManager.isProjectSaved(props.project!)
})

const save = () => {
  if (props.project !== undefined) LocalStorageManager.saveProject(props.project)
  saved.value = true
  ToastManager.showSuccessToast(toast, "You've been successfully saved a project")
}

const unsave = () => {
  if (props.project !== undefined) LocalStorageManager.unsaveProject(props.project)
  saved.value = false
  ToastManager.showSuccessToast(toast, "You've been successfully unsaved a project")
}

const goToProjectDescritpion = () => {
  router.push({ name: 'project_description', params: { name: props.project?.name } })
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
