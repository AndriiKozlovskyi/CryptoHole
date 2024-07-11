<template>
    <div class="flex flex-col h-[21.3rem] overflow-y-auto w-full">
        <table>
            <thead class="top-0 bg-primary-item-color sticky w-full">
                <tr>
                    <th :class="`text-white text-start text-[19px] font-apple px-2 py-2 ${event.status === 'paid' ? 'w-[40%]' : 'w-[80%]'}`">Name or wallet</th>
                    <th :class="`text-white text-start text-[19px] font-apple px-2 py-2 w-[20%]`">Deposit</th>
                    <th class="text-white text-start text-[19px] font-apple px-2 py-2 w-[20%]" v-if="event.status == 'paid'">Withdraw</th>
                    <th class="text-white text-start text-[19px] font-apple px-2 py-2 w-[20%]"  v-if="event.status == 'paid'">Income</th>
                </tr>
            </thead>
            <tbody>
                <AccountForm v-for="account in event.accounts" :key="account.id" :account="account" :event="event"/>
                <AccountCreationForm v-if="creationFormVisible" :id="event.id" v-on-click-outside="hideCreationForm"/>
                <div class="flex flex-row cursor-pointer hover:bg-[#4619bd] items-center space-x-3 bg-opacity-70 w-full px-4 py-2" @click="showCreationForm">
                    <i class="text-white pi pi-plus"/>
                    <p class="text-white apple-font">add account</p>
                </div>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
import { PropType, ref } from 'vue';
import AccountForm from "@/components/event_components/AccountForm.vue";
import AccountCreationForm from '@/components/event_components/AccountCreationForm.vue';
import { vOnClickOutside } from '@vueuse/components'
import SavedEvent from '@/models/saved_event_model';

defineProps({
    event: Object as PropType<SavedEvent>,
})

defineEmits(['close', 'showCreation']);

const creationFormVisible = ref(false);

const showCreationForm = () => {
    creationFormVisible.value = true;
}
const hideCreationForm = () => {
    creationFormVisible.value = false;
}

</script>