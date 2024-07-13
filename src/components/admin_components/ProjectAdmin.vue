<template>
    <Toast />
    <div
      class="relative flex bg-primary-item-color hover:bg-hover-primary-item-color h-portrait-card group overflow-hidden w-full basis-full h-[20rem] flex-col rounded-lg tracking-tight cursor-pointer transition-[transform] active:scale-[0.99] group"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      @click = "goToAdminProjectDescription"
    >
      <div class="h-[10rem] w-full grow">
        <img
          class="h-[100%] w-full rounded-t-lg object-cover opacity-[0.85] transition-all group-hover:scale-[1.02] group-hover:opacity-95"
          :src="project?.src"
        />
      </div>
      <div class="absolute w-full flex flex-row justify-between p-5">
        <Tag :tag="project?.tag" />
        <DeleteForm v-if="hovered" :project="project" @deleteProject="removeProject" />
      </div>
      <div class="flex flex-col gap-5 mt-2 px-5 relative">
        <EditForm v-if="hovered" :project="project" @click="isEditing = true"/>
        <p class="text-white text-[20px]" v-if="!isEditing">{{ project.name }}</p>
      <input v-if="isEditing" v-model="project.name" @click.stop="emit('updateProject')" @keyup.enter="save" type="text" placeholder="Name of the project"/>
        <hr class="w-full border-secondary-text-color opacity-25" />
        <div class="flex flex-row justify-between w-full mb-5 rounded-full">
          <ParticipantsForm :participants="project?.participants" />
          <ExpensesForm :expenses="project?.expenses" />
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">

  import DeleteForm  from '/src/components/admin_components/DeleteForm.vue'
  import EditForm from '@/components/admin_components/EditForm.vue';
  import ParticipantsForm from '@/components/event_components/ParticipantsForm.vue';
  import ExpensesForm from '@/components/event_components/ExpensesForm.vue';
  import { Project } from '@/types/Project';
  import { ref, defineProps, defineEmits } from 'vue';
  import { useRouter } from 'vue-router';
  import Tag from '@/components/event_components/Tag.vue';
  import Toast from '@/manager/toaster_manager.ts';

const router = useRouter()
const hovered = ref(false)
const isEditing = ref(false);
const props = defineProps({
  project: Object as PropType<Project>
});
const save = async () => {
    const project  = {
        name: props.project.name,
        src: props.project.src,
        expenses: props.project.expenses,
    };
    emit('updateProject', project)
    isEditing.value = false
};


const emit = defineEmits(['deleteProject','updateProject'])

const removeProject = (project: Project) => {
  emit('deleteProject', project)
}

const goToAdminProjectDescription = () => {
  router.push({ name: 'admin_project_description', params: { name: props.project?.name } })
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
  