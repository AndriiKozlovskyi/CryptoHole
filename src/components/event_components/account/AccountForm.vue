<template>
    <tr 
        class="rounded-md border-b border-t hover:bg-hover-primary-item-color w-full border-secondary-text-color"
        @contextmenu.prevent="onEventRightClick($event)"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
    >
        <AccountName :name="account.name" :hovered="hovered" @update="updateName"/>
        <td class="text-white apple-font">
            <p class="text-secondary-text-color" v-if="!expand">{{getCompletedTasks}}</p>
            <div class="text-secondary-text-color" v-if="expand">
                <p v-for="task in tasks" :key="task.id"><input type="checkbox" v-model="task.completed" @input="onCheckboxChange(task)"/> {{ task.header }}</p>
            </div>
        </td>
 
        <!-- Deposit -->
        <AccountFinanceForm 
            :finances="account?.deposits" 
            @new="createDeposit" 
            @update="updateDeposit"
            @delete="deleteDeposit" 
            :show="expand" 
            :hovered="hovered"
        />
        <!-- Reward -->
        <AccountFinanceForm 
            :finances="account?.rewards" 
            @new="createReward" 
            @update="updateReward"
            @delete="deleteReward" 
            :rewardType="event.rewardType" 
            :show="expand" 
            :hovered="hovered"
        />
        <!-- Withdraw -->
        <AccountFinanceForm 
            :finances="account?.withdraws" 
            @new="createWithdraw" 
            @update="updateWithdraw"
            @delete="deleteWithdraw"
            :show="expand" 
            :hovered="hovered"
        />
        <td :class="`px-2 py-2 ${clearIncome < 0 ? 'bg-opacity-15 bg-red-500' : 'bg-opacity-20 bg-green-700'}`">
            <div class="flex flex-row space-x-4 items-center justify-between">
                <p class="text-[16px] px-2 py-1 rounded-lg text-white font-apple">{{ clearIncome }} $</p>
            </div>
        </td>
        <div class="flex flex-row items-center cursor-pointer justify-end h-[3rem] px-3  text-secondary-text-color" @click="expand = !expand"
        >
            <i v-if="!expand" class="pi pi-angle-right"/>
            <i v-else class="pi pi-angle-down"/>
        </div>
    </tr>
</template>

<script setup lang="ts">
import { PropType, computed, ref, inject } from 'vue';
import Account from '@/models/account_model';
import SavedEvent from '@/models/saved_event_model';
import { emitter } from '@/event_bus';
import AccountName from "@/components/event_components/account/AccountName.vue";
import DepositRequest from '@/dtos/requests/deposit_request';
import DepositManager from '@/manager/deposit_manager';
import WithdrawRequest from '@/dtos/requests/withdraw_request';
import WithdrawManager from '@/manager/withdraw_manager';
import RewardRequest from '@/dtos/requests/reward_request';
import RewardManager from '@/manager/reward_manager';
import AccountManager from '@/manager/account_manager';
import TaskManager from '@/manager/task_manager';
import AccountFinanceForm from './AccountFinanceForm.vue';

const props = defineProps({
    account: Object as PropType<Account>,
    event: Object as PropType<SavedEvent>,
});

const menu = ref(inject("contextMenuForAccounts"));

const clearIncome = computed(() => totalWithdrawAmount.value - totalDepositAmount.value);

const deposits = ref(props.account?.deposits);
const withdraws = ref(props.account?.withdraws)
const tasks = ref(props.account.tasks);

const onCheckboxChange = (task) => {
    const _task = task;
    _task.completed = !task.completed;
    TaskManager.update(task.id, _task)

}

const getCompletedTasks = computed(() => {
    let completedCount = 0;
    for (let i = 0; i < tasks.value.length; i ++) {
        if (tasks.value[i].completed) {
            completedCount ++;
        }
    }

    return `${completedCount}/${tasks.value.length}`
})

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
const hovered = ref(false);

const createDeposit = async (value: DepositRequest) => {
    await DepositManager.createDeposit(props.account.id, value);
}

const createWithdraw = async (value: WithdrawRequest) => {
    await WithdrawManager.createIncome(props.account.id, value);
}

const createReward = async (value: RewardRequest) => {
    await RewardManager.createReward(props.account.id, value);
}

const updateDeposit = async (value) => {
    await DepositManager.update(value.id, value);
}

const updateWithdraw = async (value) => {
    await WithdrawManager.update(value.id, value);
}

const updateReward = async (value) => {
    await RewardManager.update(value.id, value);
}
const deleteDeposit = async (value) => {
    await DepositManager.deleteDeposit(value);
}

const deleteWithdraw = async (value) => {
    await WithdrawManager.deleteWithdraw(value);
}

const deleteReward = async (value) => {
    await RewardManager.deleteReward(value);
}


const updateName = async (name: string) => {
    const _account = props.account;
    _account.name = name;
    await AccountManager.update(_account.id, _account);
}

const onEventRightClick = (event) => {
  menu.value.show(event)
  emitter.emit("contextMenu", props.account.id);
}

</script>
