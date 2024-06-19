<template>
    <div class="relative flex bg-[#141418] justify-between h-[6rem] shadow-2xl hover:bg-[#28292e] overflow-hidden w-full flex-col rounded-lg tracking-tight cursor-pointer transition-[transform] active:scale-[0.99] group"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"    
        v-on-click-outside="stopEditing"   
        @keyup.enter="updateProject"
    >  
        <!--lowwer bar-->
        <div class="flex flex-row justify-between px-3">
            <!--name-->
            <div
                v-if="!isEditing"
                class="apple-font text-white text-xl font-medium">
                {{ project?.name }}
            </div>
            <MyInput
                v-if="isEditing"
                v-model="name"
                type="text"
                @focus.stop 
                @mousedown.stop
                class="w-[9rem] apple-font mt-1 text-white text-sm font-medium"
            />
            <i v-if="hovered" class="pi pi-pencil mt-3" @mousedown.stop @click="isEditing = true"/>

      
        </div>
        <div class="flex flex-row px-3 items-center space-x-2 text-gray-400 text-sm ">
            <i class="pi pi-user"/>
                <button 
                    class="px-2 py-1" 
                    @click="decreaseAccs" 
                    @mousedown.stop
                    v-if="hovered && !isEditing"
                >-</button>
                <p v-if="!isEditing">{{ project?.amountOfAccs }}</p>
                <MyInput
                    v-if="isEditing"
                    v-model="amountOfAccs"
                    type="text"
                    @focus.stop 
                    @mousedown.stop
                    class="w-[7.5rem] apple-font text-white text-sm font-medium"
                />
                <button 
                    class="px-2 py-1" 
                    @click="increaseAccs" 
                    @mousedown.stop
                    v-if="hovered  && !isEditing"
                >+</button>
            </div>
            <!--lowwer bar-->
        <div class="flex flex-row px-3 justify-between items-end w-full rounded-full text-sm text-white">
            <!--expenses-->
            <div class="flex flex-row space-x-2 mb-3 items-center ">
                <!-- <img width="16px" height="16px" src="https://cryptologos.cc/logos/tether-usdt-logo.png"/> -->

                <i class="pi pi-wallet text-gray-400"/>
                <p v-if="!isEditing" class="font-md text-[15px] text-gray-400" >
                    {{ project?.expenses }}$
                </p>
                <MyInput
                    v-if="isEditing"
                    v-model="expenses"
                    type="text"
                    @focus.stop 
                    @mousedown.stop
                    class="w-[7.5rem] apple-font text-white text-sm font-medium"
                />
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
import { vOnClickOutside } from '@vueuse/components';
const props = defineProps({
  project: { 
    required: true,
    type: Object as PropType<SavedProject>
    },
});
const hovered = ref(false);
const project = ref(props.project);
const name = ref(project.value?.name);
const amountOfAccs = ref(project.value?.amountOfAccs);
const expenses = ref(project.value?.expenses);

const isEditing = ref(false);

const emit = defineEmits(['dragSwitch'])

const increaseAccs = () => {
    emit('dragSwitch');
    project.value!.amountOfAccs = project.value!.amountOfAccs + 1;
    LocalStorageManager.updateSavedProject(project.value!);
    emit('dragSwitch');
}

const stopEditing = () => {
    isEditing.value = false;
}

const updateProject = () => {
    project.value.name = name.value;
    project.value.amountOfAccs = amountOfAccs.value;
    project.value.expenses = expenses.value;

    LocalStorageManager.updateSavedProject(project.value);
    isEditing.value = false;
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