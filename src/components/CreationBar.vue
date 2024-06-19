<template>
    <div class="flex bg-[#141418] h-portrait-card space-y-2 group mb-4 overflow-hidden flex-col rounded-lg tracking-tight cursor-pointer transition-[transform]  group"   
    >  
        <!--tag-->
    
        <!--lowwer bar-->
        <div class="flex flex-row justify-between px-5 py-4">
            <!--name-->
            <div class="flex flex-col text-sm">
                <MyInput placeholder="Name" v-model="name" type="text" class="w-[7rem]"/>
            </div>    
            <div class="flex flex-col text-sm">
                <MyInput placeholder="Accs" v-model="amountOfAccs" type="text" class="w-[5rem]"/>
            </div>
        </div>
            <!--lowwer bar-->
        <div class="flex flex-row justify-between items-center px-5 py-4">
            <!--expenses-->
            <div class="flex flex-col text-sm">
                <MyInput placeholder="Expenses" v-model="expenses" type="text" class="w-[7rem]"/>
            </div>   
            <div class="flex text-sm font-semibold py-3 bg-[#151619] hover:bg-[#181a1d] rounded-lg items-center justify-center px-5">
                <button class="" @click="save">Save</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import MyInput from "@/components/MyInput.vue";
import type { SavedProject } from "@/entity/saved_project";
import LocalStorageManager from "@/manager/local_storage_manager";
import { ref } from "vue";

const props = defineProps({
   status: String 
});

const name = ref("");
const expenses = ref("");
const amountOfAccs = ref("");

const emit = defineEmits(['save']);

const save = () => {
    const project: SavedProject = {name: name.value, amountOfAccs: Number(amountOfAccs.value), expenses: Number(expenses.value), status: props.status! }
    LocalStorageManager.addSavedProject(project);
    emit('save');
}
</script>