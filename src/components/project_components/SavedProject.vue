<template>
    <div class="flex bg-hover-primary-item-color h-[9rem] shadow-lg overflow-hidden w-full flex-col rounded-lg cursor-pointer transition-[transform] active:scale-[0.99] group"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"    
        v-on-click-outside="stopEditing"   
        @keyup.enter="updateProject"
    >  
        <div class="flex flex-row justify-between px-3">
            <div
                v-if="!isEditing"
                class="apple-font text-white mt-1 text-[16px]">
                {{ project?.name }}
            </div>
            <MyInput
                v-if="isEditing"
                v-model="name"
                type="text"
                @focus.stop 
                @mousedown.stop
                class="w-[9rem] apple-font mt-1 text-white text-[14px]"
            />
            <i v-if="hovered && !isEditing" class="pi pi-pencil mt-3" @mousedown.stop @click="isEditing = true"/>
        </div>

        <div class="flex flex-col mt-3 space-y-1 ml-3">
            <div class="flex flex-row items-center space-x-2">
                <i class="pi pi-user secondary-text-color"/>
                <button
                    class="px-1"
                    @click="decreaseAccs" 
                    @mousedown.stop
                    v-if="hovered && !isEditing"
                >-</button>
                <p v-if="!isEditing" class="text-[14px] text-white">{{ project?.amountOfAccs }}</p>
                <MyInput
                    v-if="isEditing"
                    v-model="amountOfAccs"
                    type="text"
                    @focus.stop 
                    @mousedown.stop
                    class="w-[7.5rem] apple-font text-white text-sm font-medium"
                />
                <button 
                    class="px-1" 
                    @click="increaseAccs" 
                    @mousedown.stop
                    v-if="hovered  && !isEditing"
                >+</button>
            </div>
            <ExpensesForm v-if="!isEditing" :expenses="expenses"/>
            <div v-if="isEditing" class="flex flex-row space-x-2 items-center">
                <i class="pi pi-wallet text-secondary-text-color"/>
                <MyInput
                    v-model="expenses"
                    type="text"
                    @focus.stop 
                    @mousedown.stop
                    class="w-[7.5rem] apple-font text-white"
                />
            </div>
            <div class="flex flex-row text-[14px] space-x-2 items-center">
                <i class="pi pi-clock"/>
                <p class="w-[10rem] rounded-lg text-white">10h before</p>

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
import ExpensesForm from '@/components/basic_components/ExpensesForm.vue';

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