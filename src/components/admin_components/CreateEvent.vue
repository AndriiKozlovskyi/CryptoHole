<template>
  <div class="h-full w-[calc(100%-15rem)] flex justify-center items-center bg-background-color z-[1000] fixed top-[-1rem]">
    <div class="bg-background-color justify-center items-center flex w-[22rem] rounded-2xl flex-col space-y-2 relative p-6">
      <div class="flex flex-row items-center justify-center mb-8">
        <button class="pi pi-arrow-left text-[#4619bd] text-[1.3rem] hover:text-[#d2bff3] duration-300 cursor-pointer absolute left-[2rem] top-[2rem] flex self-center" @click="goToAdminPage"></button>
        <h1 class="text-white text-2xl font-semibold apple-font">Create an event</h1>
      </div>
      <MyInput class="w-[20rem] h-[2.5rem] rounded-md" placeholder="Name" type="text" v-model="name" />
      <MultiSelect v-model="tag" :options="tags" optionLabel="name" filter placeholder="Select Tags" :maxSelectedLabels="3" class="text-white bg-primary-item-color w-full" />
      <MyInput class="w-[20rem] h-[2.5rem] rounded-md" placeholder="Expenses" type="number" v-model="expenses" />
      <MyInput class="w-[20rem] h-[2.5rem] rounded-md" placeholder="Image Link" type="text" v-model="image" />
      <div class="flex flex-row justify-between w-full">
        <button class="rounded-lg hover:bg-gray-600 px-6 py-2 apple-font bg-hover-primary-item-color text-white" @click="resetForm">Clear</button>
        <button class="rounded-lg hover:bg-[#4619bd] px-6 py-2 apple-font bg-[#4c12b2] text-white" @click="createEvent">Save</button>
      </div>
    </div>
  </div>
  <Toast />
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import MultiSelect from 'primevue/multiselect';
import MyInput from "@/components/basic_components/input/MyInput.vue"
import ToastManager from '@/manager/toaster_manager';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import EventManager from '@/manager/event_manager';
import TagManager from '@/manager/tag_manager';
import EventRequest from '@/dtos/requests/event_request';

const router = useRouter();
const toast = useToast();

const tags = computed(() => TagManager.all());

const name = ref();
const tag = ref();
const expenses = ref(0);
const image = ref();

const resetForm = () => {
  name.value = '';
  tag.value = '';
  expenses.value = 0;
  image.value = '';
  
}

const goToAdminPage = () => {
  router.push("/admin/event_management");
};

const createEvent = () => {
  const linkPattern = /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  const letterPattern = /^[a-zA-Z]+$/;


  if (!name.value ||!tag.value || !expenses.value ||!image.value) {
    ToastManager.showErrorToast(toast, "Please fill all the fields");
    return; 
  }

  if(!letterPattern.test(name.value)) {
  ToastManager.showErrorToast(toast, "Invalid name. Please, provide a valid name")
  return
} 
  if(!linkPattern .test(image.value)) {
    ToastManager.showErrorToast(toast, "Invalid image link. Please, provide a valid URL.")
    return;
  }
  const tagRequests: number[] = tag.value.map(_tag => _tag.id);

  const event: EventRequest = {
    name: name.value,
    tagsIds: tagRequests,
    src: image.value,
    participants: 0
  }
  EventManager.createEvent(event);

  ToastManager.showSuccessToast(toast, "You've been successfully created an event"); 
  resetForm();
}
</script>