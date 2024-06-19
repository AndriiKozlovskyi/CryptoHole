<template>
    <div class="relative flex bg-hover-primary-item-color justify-between h-[5.5rem] shadow-lg overflow-hidden w-full flex-col rounded-lg tracking-tight cursor-pointer transition-[transform] active:scale-[0.99] group"
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
                class="apple-font text-white mt-1 font-base">
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
            <i v-if="hovered && !isEditing" class="pi pi-pencil mt-3" @mousedown.stop @click="isEditing = true"/>
        </div>
        <div class="flex flex-row px-3 items-center space-x-2 text-sm ">
            <i class="pi pi-user secondary-text-color"/>
                <button 
                    class="px-2 py-1" 
                    @click="decreaseAccs" 
                    @mousedown.stop
                    v-if="hovered && !isEditing"
                >-</button>
                <p v-if="!isEditing" class="apple-font text-white">{{ project?.amountOfAccs }}</p>
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
                <i class="pi pi-wallet text-secondary-text-color"/>
                <div class="flex flex-row">
                    <p class="text-secondary-text-color">$</p>
                    <p v-if="!isEditing" class="apple-font text-white" >
                        {{ project?.expenses }}
                    </p>
                </div>
          
                <MyInput
                    v-if="isEditing"
                    v-model="expenses"
                    type="text"
                    @focus.stop 
                    @mousedown.stop
                    class="w-[7.5rem] apple-font text-white"
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
import MyInput from '@/components/basic_components/MyInput.vue';
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');


  .tag-bg {
    border-top-left-radius: 30%;
  }
  .font {
    font-family: Inter,Helvetica Rounded,Helvetica,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    font-size: 16px;
    font-weight: 400;
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