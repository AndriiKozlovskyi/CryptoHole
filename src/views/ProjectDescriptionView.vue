<template>
  <Toast/>
  <div class="flex h-100% w-full flex-row justify-start items-center">
    <main class="w-full h-full flex justify-between font">
      <article class="absolute h-100% flex flex-col mt-[1rem] space-y-10 ml-[5rem] max-w-[40rem]">
        <header class="text-white z-[50] text-3xl ml-16 font-extrabold mb-10 relative top-[3.5rem] p-4">Step-by-step guide</header>
        <div class="top-0 bottom-0 fixed left-[7.1rem] transform translate-x-1 w-1 bg-gray-500 z-0"></div>
          
        <TaskMain v-for="task in tasks" :taskTitle="task.taskTitle" :taskDescription="task.taskDescription" :key="task.taskNumber" :taskNumber="task.taskNumber">
        </TaskMain>
      </article>
    </main>

    <aside class="w-[32rem] h-[47rem] flex flex-col rounded-lg self-center fixed left-[55rem] top-[5.5rem]">
      <div class="mt-10 ml-auto mr-auto">
        <i class="pi pi-arrow-left text-secondary-text-color text-2xl top-[1rem] right-[0.7rem] absolute hover:cursor-pointer transition-transform duration-300 hover:-translate-x-2" @click="router.go(-1)"></i>

        <section class="relative">
          <img :src="project?.src" alt="Logo" class="w-full h-auto" />
          <Tag class="absolute top-3 left-3" :tag="tag"/>
        </section>

        <section class="flex flex-col justify-center space-y-5 mt-5 text-sm relative">
            <a class="text-blue-500 font-bold hover:text-blue-400" target="_blank" href="https://www.drift.trade/drift-governance-token"><i class="pi pi-link text-secondary-text-color"></i>Drift Governance Token</a>
            <SaveButton class="items-center justify-center absolute right-[-1rem] w-[5rem] h-[5rem] hover:bg-[rgb(30,31,34)] rounded-full top-[-3rem]" :condition="saved" @save="save" @unsave="unsave"/>
            <ParticipantsForm class="text-white" :participants="participants"/>
            <ExpensesForm :expenses="expenses"/>
            <DescriptionAside :description="description" />
        </section>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import LocalStorageManager from '@/manager/local_storage_manager';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import SaveButton from '@/components/project_components/SaveButton.vue';
import ExpensesForm from '@/components/project_components/ExpensesForm.vue';
import Tag from '@/components/project_components/Tag.vue';
import ParticipantsForm from '@/components/project_components/ParticipantsForm.vue';
import DescriptionAside from '@/components/project_description/DescriptionAside.vue';
import ToastManager from '@/manager/toaster_manager';
import TaskMain from '@/components/project_description/TaskMain.vue';

const router = useRouter();
const toast = useToast();
const project = ref();
const route = useRoute();

const saved = ref(false);
const tasks = [
  {
    taskNumber: 1,
    taskTitle: 'Open your SCube account',
    taskDescription: 'Go to the SCube website and create a new account or log in to your existing account.'
  },
  {
    taskNumber: 2,
    taskTitle: 'Initiate a transfer',
    taskDescription: 'From your SCube account, initiate a transfer of funds to the Drift exchange.'
  },
  {
    taskNumber: 3,
    taskTitle: 'Verify the transaction',
    taskDescription: 'Check your transaction history and ensure that the transfer was successful.'
  },
  {
    taskNumber: 4,
    taskTitle: 'Fund your Drift account',
    taskDescription: 'Once the transfer is complete, log in to your Drift account and deposit the funds.'
  },
  {
    taskNumber: 5,
    taskTitle: 'Start trading',
    taskDescription: 'With your account funded, you can now start trading on the Drift exchange.'
  },
  {
    taskNumber: 5,
    taskTitle: 'Start doing',
    taskDescription: 'With your account funded, you can now start trading on the Drift exchange.'
  }
];

const task = ref([{taskTitle: 'Open your SCube account, Initiate a transfer, Verify the transaction', taskDescription: 'Open your SCube account, Initiate a transfer, Verify the transaction', taskNumber: 1}]);
const participants = ref();
const expenses = ref();
const tag = ref();
const description = ref("Drift is a fully on-chain perpetual and spot DEX built on Solana. The exchange offers traders the ability to trade pre-launch markets and launched tokens with up to 10x leverage. Beyond stablecoins, traders can use a wide range of assets as collateral, allowing for greater capital efficiency.");

onMounted(() => {
  project.value = LocalStorageManager.getProjectByName(route.params.name);
  participants.value = project.value.participants;
  expenses.value = project.value.expenses;
  tag.value = project.value.tag;
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



