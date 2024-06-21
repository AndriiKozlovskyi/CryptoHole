<template>
  <Toast/>
  <div class="flex h-100% w-full flex-row justify-start items-center ">
    <main class="w-full h-full flex justify-between font ">
      <div class="absolute h-100% flex  flex-col mt-[1rem] space-y-10 ml-[5rem] max-w-[40rem] ">
        <p class="text-white z-[300] text-3xl ml-16 font-extrabold mb-10 relative  top-[3.5rem]  p-4 ">Step - by - step guide</p>

        <div class="flex text-gray-400 items-stretch">
          <div class="bg-[#1e1f24] text-white font-extrabold text-3xl h-20 min-w-20 flex items-center justify-center rounded-full z-10">1</div>
          <div class="flex flex-col ml-3">
            <p class="font-bold text-xl mb-3 text-white">Spend 2 hour on project </p>
            <ul class="list-decimal ml-10 flex flex-col space-y-2">
              <li>Read the project documentation</li>
              <li>Understand the project requirements</li>
              <li>Plan your approach</li>
            </ul>
          </div>
        </div>
        <div class="flex items-stretch text-gray-400">
          <div class="bg-[#1e1f24] text-white font-extrabold h-20 text-3xl min-w-20 flex items-center justify-center rounded-full z-10">2</div>
          <div class="flex flex-col ml-3">
            <p class="font-bold text-xl mb-2 mt-2 text-white">Mint SCube</p>
            <ul class="list-decimal  ml-10 flex flex-col space-y-2">
              <li>Connect your wallet</li>
              <li>Select the desired SCube</li>
              <li>Confirm the transaction</li>
            </ul>
        </div>
        </div>
        <div class="flex items-stretch text-gray-400">
          <div class="bg-[#1e1f24] text-white font-extrabold h-20 min-w-20 text-3xl flex items-center justify-center rounded-full z-10">3</div>
          <div class="flex flex-col ml-3">
            <p class=" font-bold text-xl mb-2 mt-2 text-white">Deposit your e-wallet "MetaMask"</p>
            <ul class="list-decimal  ml-10 flex flex-col space-y-2">
              <li>Open your MetaMask wallet</li>
              <li>Select the deposit option</li>
              <li>Follow the on-screen instructions</li>
            </ul>
          </div>
        </div>
        <div class="flex items-stretch text-gray-400">
          <div class="bg-[#1e1f24] text-white font-extrabold h-20 min-w-20 text-3xl flex items-center justify-center rounded-full z-10">4</div>
          <div class="flex flex-col ml-3">
            <p class=" font-bold text-xl mb-2 mt-2 text-white">Transfer funds to SCube</p>
            <ul class="list-decimal ml-10 flex flex-col space-y-2">
              <li>Open your SCube account</li>
              <li>Initiate a transfer</li>
              <li>Verify the transaction</li>
            </ul>
          </div>
        </div>
            <div class="flex items-stretch text-gray-400">
            <div class="bg-[#1e1f24] text-white font-extrabold h-20 min-w-20 text-3xl flex items-center justify-center rounded-full z-10">5</div>
            <div class="flex flex-col ml-3">
                <p class=" font-bold text-xl mb-2 mt-2 text-white">Stake your SCube</p>
                <ul class="list-decimal ml-10 flex flex-col space-y-2 ">
                <li>Go to the staking page</li>
                <li>Select the amount to stake</li>
                <li>Confirm and finalize the staking</li>
                </ul>
            </div>
            </div>
        <div class=" top-0 bottom-0 fixed left-[7.1rem] transform translate-x-1 w-1 bg-gray-500 z-0"></div>
      </div>
      
      <aside class=" w-[32rem] h-[47rem] flex flex-col rounded-lg self-center fixed left-[55rem] top-[5.5rem]">
        <div class="mt-10 ml-auto mr-auto">
          <i class="pi pi-arrow-left text-gray-500 text-2xl top-[1rem] right-[1rem] absolute hover:cursor-pointer transition-transform duration-300 hover:-translate-x-2" @click="router.go(-1)"></i>

        <div class="relative">
           <img src="https://cdn.prod.website-files.com/6310e7dee49f0866da8eed4c/63adcc1db02d660497f9957e_Drift%20Full%20Logo%20White.png" alt="Logo" class="w-full h-auto" />
           <p class="absolute top-3 left-3 text-white w-[4rem] h-[2rem] flex justify-center items-center bg-gray-500 bg-opacity-50  rounded-full hover:bg-opacity-100 cursor-pointer"><i class=" pi pi-hashtag"></i>div.v</p>
        </div>
    <div class="flex flex-col space-y-5 mt-8 text-sm relative">
      <div class="flex flex-row space-x-3">
        <i class="pi pi-link text-gray-400 self-center text-large"></i>
        <a class="text-blue-500 font-bold text-large hover:text-blue-400" target="_blank" href="https://www.drift.trade/drift-governance-token">Drift Governance Token</a>
 <button class="bg-[rgb(16,17,20)] w-[5rem] h-[5rem] hover:bg-[rgb(30,31,34)] rounded-full absolute right-0 bottom-[3rem]" @click.stop="saved ? unsave() : save()">
        <i v-if="saved" class="pi pi-bookmark-fill text-white text-xl"></i>
        <i v-if="!saved" class="pi pi-bookmark text-white text-xl"></i>
</button>

      </div>
        <div class='flex flex-row space-x-3 text-sm '>
          <i class="pi pi-users text-large text-gray-400 self-center"></i>
          <p class="text-white">1000 / 5000</p>
        </div>
        <div class="flex flex-row space-x-3 text-sm">
        <i class="pi pi-wallet text-large text-gray-400 self-center"></i>
        <p class="text-white flex items-center"><i class="pi pi-dollar text-gray-500 text-sm "></i>3000 - 5000</p>
      </div>
    </div>
  </div>
        <p class="text-start pl-2 mt-10 font-extrabold text-2xl text-white">Description:</p>
        <div class="mt-3 ml-auto mr-auto rounded-lg p-5 text-gray-400 ">
          <p>Drift is a fully on-chain perpetual and spot DEX built on Solana. The exchange offers traders the ability to trade pre-launch markets and launched tokens with up to 10x leverage. Beyond stablecoins, traders can use a wide range of assets as collateral, allowing for greater capital efficiency.</p>
        </div>
      </aside>
    </main>
  </div>
  
</template>

<script setup lang="ts">

import LocalStorageManager from '@/manager/local_storage_manager';
import {onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ToastManager from "@/manager/toaster_manager";
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const route = useRoute();
const saved = ref(false);
const project = ref();

const isHovering = ref(false)

const startAnimation = () => {
  isHovering.value = true
}

const stopAnimation = () => {
  isHovering.value = false
}

onMounted(() => {
   project.value = LocalStorageManager.getProjectByName(route.params.name); 
});

 const save = () => {
    if (project.value !== undefined)
        LocalStorageManager.saveProject(project.value)
     saved.value = true;
     ToastManager.showSuccessToast(toast, "You've been successfully saved a project")
 };

 const unsave = () => {
 const savedProject = LocalStorageManager.getSavedProjectByName(project?.value.name);
     if (project.value !== undefined)
        LocalStorageManager.unsaveProject(savedProject)
    saved.value = false;
    ToastManager.showSuccessToast(toast, "You've been successfully unsaved a project")
};

</script>

<style module>


.font {
  font-family: 'Montserrat', sans-serif;
}

</style>
