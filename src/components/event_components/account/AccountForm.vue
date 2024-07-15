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
        <AccountDeposits :deposits="account?.deposits" @new-deposit="createDeposit" :show-all="expand"/>
        <AccountRewards :rewards="account?.rewards" @new-reward="createReward" :show-all="expand" v-if="event.status === 'rewarded'"/>
        <AccountWithdraws :withdraws="account?.withdraws" @new-withdraw="createIncome" :show-all="expand" v-if="event.status === 'monetized'"/>
        <td :class="`px-2 py-2 ${clearIncome < 0 ? 'bg-opacity-15 bg-red-500' : 'bg-opacity-20 bg-green-700'}`" v-if="event.status === 'monetized'">
            <div class="flex flex-row space-x-4 items-center justify-between">
                <p class="text-[16px] px-2 py-1 rounded-lg text-white font-apple">{{ clearIncome }} $</p>
            </div>
        </td>
        <div class="flex flex-row items-center justify-end h-[3rem] px-3  text-secondary-text-color" @click="expand = !expand"
        >
            <i v-if="!expand" class="pi pi-angle-right"/>
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
import AccountWithdraws from "@/components/event_components/account/AccountWithdraws.vue";
import DepositRequest from '@/dtos/requests/deposit_request';
import DepositManager from '@/manager/deposit_manager';
import WithdrawRequest from '@/dtos/requests/withdraw_request';
import WithdrawManager from '@/manager/withdraw_manager';
import AccountRewards from "@/components/event_components/account/AccountRewards.vue";
import RewardRequest from '@/dtos/requests/reward_request';
import RewardManager from '@/manager/reward_manager';

const props = defineProps({
    account: Object as PropType<Account>,
    event: Object as PropType<SavedEvent>,
});

const menu = ref(inject("contextMenuForAccounts"));

const clearIncome = computed(() => totalWithdrawAmount.value - totalDepositAmount.value);

const deposits = ref(props.account?.deposits);
const withdraws = ref(props.account?.withdraws)

const totalDepositAmount = computed(() => {
    return deposits.value?.reduce((sum, deposit) => {
    return sum + (deposit.amount || 0);
    }, 0);
});
const totalWithdrawAmount = computed(() => {
    return withdraws.value?.reduce((sum, withdraw) => {
    return sum + (withdraw.amount || 0);
    }, 0);
});

const expand = ref(false);

const editing = ref(false);
const hovered = ref(false);

const stopEdit = () => {
    editing.value = false;
}

const createDeposit = async (value: DepositRequest) => {
    await DepositManager.createDeposit(props.account.id, value);
}

const createIncome = async (value: WithdrawRequest) => {
    await WithdrawManager.createIncome(props.account.id, value);
}

const createReward = async (value: RewardRequest) => {
    await RewardManager.createReward(props.account.id, value);
}


const onEventRightClick = (event) => {
  menu.value.show(event)
  emitter.emit("contextMenu", props.account.id);
}

</script>
