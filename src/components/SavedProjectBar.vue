<template>
    <div class="relative flex bg-[#141418] justify-between h-[6rem] shadow-2xl hover:bg-[#28292e] overflow-hidden w-full flex-col rounded-lg tracking-tight cursor-pointer transition-[transform] active:scale-[0.99] group"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"        
    >  
        <!--lowwer bar-->
        <div class="flex flex-row justify-between px-3">
            <!--name-->
            <div class="apple-font text-white text-xl mt-1 font-medium">
                {{ project?.name }}
            </div>
            <i v-if="hovered" class="pi pi-pencil mt-3"/>

      
        </div>
        <div class="flex flex-row px-3 items-center space-x-2 text-gray-400 text-sm ">
            <i class="pi pi-user"/>
                <button 
                    class="px-2 py-1" 
                    @click="decreaseAccs" 
                    @mousedown.stop
                    v-if="hovered"
                >-</button>
                <p>{{ project?.amountOfAccs }}</p>
                <button 
                    class="px-2 py-1" 
                    @click="increaseAccs" 
                    @mousedown.stop
                    v-if="hovered"
                >+</button>
            </div>
            <!--lowwer bar-->
        <div class="flex flex-row px-3 justify-between items-end w-full rounded-full text-sm text-white">
            <!--expenses-->
            <div class="flex flex-row space-x-2 mb-3 items-center ">
                <!-- <img width="16px" height="16px" src="https://cryptologos.cc/logos/tether-usdt-logo.png"/> -->

                <i class="pi pi-wallet text-gray-400"/>
                <p class="font-md text-[15px] text-gray-400" >
                    {{ project?.expenses }}$
                </p>
            </div>
            
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type {SavedProject} from "@/entity/saved_project";
import type { PropType } from 'vue';
import LocalStorageManager from '@/manager/local_storage_manager';
import MyInput from './MyInput.vue';

const props = defineProps({
  project: Object as PropType<SavedProject>,
});
const hovered = ref(false);
const project = ref(props.project);
const showExpensesInput = ref(false);
const emit = defineEmits(['dragSwitch'])

const increaseAccs = () => {
    emit('dragSwitch');
    project.value!.amountOfAccs = project.value!.amountOfAccs + 1;
    LocalStorageManager.updateSavedProject(project.value!);
    emit('dragSwitch');
}

const decreaseAccs = () => {
    emit('dragSwitch');
    if (project.value!.amountOfAccs <= 1) return
    project.value!.amountOfAccs = project.value!.amountOfAccs - 1;
    LocalStorageManager.updateSavedProject(project.value!);
    emit('dragSwitch');
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');


  .tag-bg {
    border-top-left-radius: 30%;
  }
  .font {
    font-family: Inter,Helvetica Rounded,Helvetica,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    font-size: 16px;
    font-weight: 400;
  }

  .apple-font {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
  }
  .part {
    font-family: Inter,Helvetica Rounded,Helvetica,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    font-size: 12px;
  }
  .amount {
    font-family: Inter,Helvetica Rounded,Helvetica,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    font-size: 14px;
  }
  </style>