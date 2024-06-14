<template>
       <div class="relative text-white w-[16rem] flex overflow-hidden h-[23rem] flex-col rounded-lg">
        
        <div class=" ">
            <!-- <img class="h-full w-full rounded-t-xl object-cover opacity-[0.85] transition-all group-hover:scale-[1.02] group-hover:opacity-95" :src="src"/> -->
        </div>
        <div class="flex flex-col mt-2 items-start px-5">
            <p>tag</p>
            <input class="text-black" type="text" v-model="tag"/>
        </div>
    

        <div class="flex flex-col mt-2 items-start px-5">
            <p>name</p>
            <input type="text" class="text-black" v-model="name"/>

            <hr class="w-full border-gray-700">
            <div class="flex flex-row justify-between w-full rounded-full text-white">

                <div class="flex flex-col space-x-1 mb-5">
                    <p>expenses</p>

                    <div class="flex flex-row">
                        <input type="text" class="text-black" v-model="expenses"/>
                        <img width="16px" heig1ht="16px" src="https://cryptologos.cc/logos/tether-usdt-logo.png"/>
                    </div>
             </div>
             
            </div>
        </div>
        <button label="Save" class="bg-white text-black text-lg text-center px-3 py-1 hover:bg-gray-500 rounded-lg" @click="save">Save</button>

    </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import LocalStorageManager from "@/manager/local_storage_manager";
import type { Project } from "@/entity/Project";
const name = ref("");
const expenses = ref(0);
const tag = ref("");
const imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJG9XGMPtStvfpNrq95QCApHkwQexkoX9tow&s";

const save = () => {
    const project: Project = {name: name.value, tag: tag.value, expenses: expenses.value, src: imgSrc, participants: 0 }
    LocalStorageManager.addProject(project);
}
</script>