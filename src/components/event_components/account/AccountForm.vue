<template>
    <tr 
        class="rounded-md border-b border-t hover:bg-hover-primary-item-color cursor-pointer w-full h-[3rem] border-secondary-text-color"
        :class="{ [`bg-hover-primary-item-color`]: editing }"
        v-on-click-outside="stopEdit"
        @contextmenu.prevent="onEventRightClick($event)"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
    >
        <AccountName :name="account.name"/>
        <AccountDeposits :deposits="account?.deposits" @new-deposit="createDeposit" :show-all="showAllDepositsAndIncomes"/>
        <AccountIncomes :incomes="account?.incomes" @new-income="createIncome" :show-all="showAllDepositsAndIncomes"/>
        <td :class="`px-2 py-2 ${clearIncome < 0 ? 'bg-opacity-15 bg-red-500' : 'bg-opacity-20 bg-green-700'}`" v-if="event.status === 'paid'">
            <div class="flex flex-row space-x-4 items-center justify-between">
                <p class="text-[16px] px-2 py-1 rounded-lg text-white font-apple">{{ clearIncome }} $</p>
            </div>
        </td>
        <div class="flex flex-row items-center justify-end h-[3rem] px-3  text-secondary-text-color" @click="showAllDepositsAndIncomes = !showAllDepositsAndIncomes"
        >
            <i v-if="!showAllDepositsAndIncomes" class="pi pi-angle-right"/>
            <i v-else class="pi pi-angle-down"/>
        </div>
    </tr>
</template>

<script setup lang="ts">
import { PropType, computed, ref, inject } from 'vue';
import Account from '@/models/account_model';
import { vOnClickOutside } from '@vueuse/components'
import SavedEvent from '@/models/saved_event_model';
import { emitter } from '@/event_bus';
import AccountName from "@/components/event_components/account/AccountName.vue";
import AccountDeposits from "@/components/event_components/account/AccountDeposits.vue";
import AccountIncomes from "@/components/event_components/account/AccountIncomes.vue";
import DepositRequest from '@/dtos/requests/deposit_request';
import DepositManager from '@/manager/deposit_manager';
import IncomeRequest from '@/dtos/requests/income_request';
import IncomeManager from '@/manager/income_manager';

const props = defineProps({
    account: Object as PropType<Account>,
    event: Object as PropType<SavedEvent>,
});

const menu = ref(inject("contextMenuForAccounts"));

const clearIncome = computed(() => totalIncomeAmount.value - totalDepositAmount.value);

const deposits = ref(props.account?.deposits);
const incomes = ref(props.account?.incomes)

const totalDepositAmount = computed(() => {
    return deposits.value.reduce((sum, deposit) => {
    return sum + (deposit.amount || 0);
    }, 0);
});
const totalIncomeAmount = computed(() => {
    return incomes.value.reduce((sum, income) => {
    return sum + (income.amount || 0);
    }, 0);
});

const showAllDepositsAndIncomes = ref(false);

const editing = ref(false);
const hovered = ref(false);

const stopEdit = () => {
    editing.value = false;
}

const createDeposit = async (value: DepositRequest) => {
    await DepositManager.createDeposit(props.account.id, value);
}

const createIncome = async (value: IncomeRequest) => {
    await IncomeManager.createIncome(props.account.id, value);
}

const onEventRightClick = (event) => {
  menu.value.show(event)
  emitter.emit("contextMenu", props.account.id);
}

</script>
