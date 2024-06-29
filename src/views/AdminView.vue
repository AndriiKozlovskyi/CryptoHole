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


</script>
