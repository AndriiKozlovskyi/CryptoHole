<template>
    <div class="flex flex-col w-full h-[21.3rem] overflow-auto">
        <ContextMenu :model="items" ref="contextMenu"/>

        <table>
            <thead class="top-0 sticky bg-primary-item-color w-full">
                <tr>
                    <th :class="`text-white text-start text-[19px] font-apple px-2 py-2 ${event.status === 'revenue' || event.status ===  'rewarded' ? 'w-[40%]' : 'w-[80%]'}`">Name or wallet</th>
                    <th :class="`text-white text-start text-[19px] font-apple px-2 py-2 w-[20%] ${event.status ===  'rewarded' ? 'w-[40%]' : 'w-[20%]'}`">Deposit</th>
                    <th class="text-white text-start text-[19px] font-apple px-2 py-2 w-[20%]" v-if="event.status == 'rewarded'">Rewards</th>
                    <th class="text-white text-start text-[19px] font-apple px-2 py-2 w-[20%]" v-if="event.status == 'revenue'">Withdraw</th>
                    <th class="text-white text-start text-[19px] font-apple px-2 py-2 w-[20%]"  v-if="event.status == 'revenue'">Income</th>
                    <th class="text-white text-start text-[19px] font-apple px-2 py-2"> 
                        <i class="text-white pi pi-plus rounded-full bg-purple px-1 py-1 text-center cursor-pointer hover:bg-hover-purple" @click="showCreationForm"/>
                    </th>
                </tr>
            </thead>
            <tbody>
                <AccountCreationForm v-if="creationFormVisible" :id="event.id" v-on-click-outside="hideCreationForm"/>
                <AccountForm v-for="account in event.accounts" :key="account.id" :account="account" :event="event"/>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
import { PropType, onMounted, provide, ref } from 'vue';
import AccountForm from "@/components/event_components/account/AccountForm.vue";
import AccountCreationForm from '@/components/event_components/account/AccountCreationForm.vue';
import { vOnClickOutside } from '@vueuse/components'
import SavedEvent from '@/models/saved_event_model';
import ContextMenu from 'primevue/contextmenu'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import AccountManager from '@/manager/account_manager';
import { emitter } from '@/event_bus';

defineProps({
    event: Object as PropType<SavedEvent>,
})

defineEmits(['close', 'showCreation']);

const confirm = useConfirm();
const toast = useToast();

const creationFormVisible = ref(false);

const showCreationForm = () => {
    creationFormVisible.value = true;
}
const hideCreationForm = () => {
    creationFormVisible.value = false;
}

const contextMenu = ref(null)  // Declare the context menu ref
provide('contextMenuForAccounts', contextMenu)

const accountIdForContextMenu = ref();

onMounted(() => {
  emitter.on("contextMenu", (value) => {
    accountIdForContextMenu.value = value
  })
})

const items = ref([
  { label: 'Delete', icon: 'pi pi-trash', command: async () => confirm1() },
])


const onDelete = async () => {
  await AccountManager.deleteAccount(accountIdForContextMenu.value)
}

const confirm1 = () => {
    confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Save'
        },
        accept: async () => {
            await onDelete()
            toast.add({ severity: 'info', summary: 'Deleted', detail: 'You have deleted account', life: 3000 });
        },
        reject: () => {
        }
    });
};

</script>
<style>
tbody {
    height: 10px;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>