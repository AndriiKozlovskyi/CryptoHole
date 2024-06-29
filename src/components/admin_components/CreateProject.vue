<template>
  <div class="h-full w-full flex justify-center items-center">
    <div class="bg-background-color justify-center items-center flex w-[30rem] h-[30rem] rounded-2xl flex-col space-y-7 relative">
      <div class="flex flex-row items-center justify-center">
        <button class="pi pi-arrow-left text-white text-[1.5rem] hover:text-[#4c12b2] duration-300 cursor-pointer absolute left-[6rem] flex self-center" @click="goToAdminPage"></button>
        <h1 class="text-white text-2xl font-semibold">Create a project</h1>
      </div>
      <MyInput class="w-[20rem] h-[3rem]" placeholder="Name" type="text" v-model="name" />
      <MyInput class="w-[20rem] h-[3rem]" placeholder="Tag" type="text" v-model="tag" />
      <MyInput class="w-[20rem] h-[3rem]" placeholder="Expenses" type="text" v-model="expenses" />
      <MyInput class="w-[20rem] h-[3rem]" placeholder="Image Link" type="text" v-model="image" />
      <button label="Save" class="rounded-lg hover:bg-[#4619bd] px-3 py-2 apple-font bg-[#4c12b2] text-white" @click="createProject">Save</button>
    </div>
  </div>
  <Toast />
</template>


<script setup lang="ts">

import { ref } from 'vue';
import MyInput from "@/components/basic_components/input/MyInput.vue"
import LocalStorageManager from '@/manager/local_storage_manager';
import ToastManager from '@/manager/toaster_manager';
import { useToast } from 'primevue/usetoast';
import type { Project } from '@/entity/Project';
import { useRouter } from 'vue-router';
 
const router = useRouter();
const toast = useToast();


const name = ref();
const tag = ref();
const expenses = ref();
const image = ref();

const resetForm = () => {
  name.value = '';
  tag.value = '';
  expenses.value = '';
  image.value = '';
  
}

const goToAdminPage = () => {
  router.push({ name: "admin" });
};

const createProject = () => {
  const linkPattern = /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  const numberPattern = /^[0-9]+(\.[0-9]+)?$/;
  const letterPattern = /^[a-zA-Z]+$/;



  if (!name.value ||!tag.value || !expenses.value ||!image.value) {
    ToastManager.showErrorToast(toast, "Please fill all the fields");
    return; 
  }

  if(!letterPattern.test(name.value)) {
  ToastManager.showErrorToast(toast, "Invalid name. Please, provide a valid name")
  return
} 
  if (!letterPattern.test(tag.value)) {
  ToastManager.showErrorToast(toast, "Invalid tag. Please, provide a valid tag.");
  return;
}
  if (!numberPattern.test(expenses.value)) {
  ToastManager.showErrorToast(toast, "Invalid cost for one account. Please, provide a valid number.");
  return;
}

  if(!linkPattern .test(image.value)) {
    ToastManager.showErrorToast(toast, "Invalid image link. Please, provide a valid URL.")
    return;
  }

  const project: Project = {
    name: name.value,
    tag: tag.value,
    expenses: expenses.value,
    src: image.value,
    participants: 0
  }
  ToastManager.showSuccessToast(toast, "You've been successfully created a project"); 
  LocalStorageManager.addProject(project);
  resetForm();
}
</script>