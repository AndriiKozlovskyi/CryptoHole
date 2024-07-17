<template>
    <div class="fixed flex flex-col w-full h-full bg-primary-item-color items-center justify-center overflow-auto">
        <SavedEventHeader :event="event" @close="close"/>

        <div class="w-full flex h-full flex-col mt-36 rounded-md gap-y-3">
            <MyButton v-if="event.accounts.length === 0" text="Auto Create Accounts" @on-click="autoCreationFormVisible = true"/>
            <div 
                class="flex flex-col space-y-10 absolute self-center justify-self-center rounded-md bg-background-color z-[102] px-20 py-5"
                v-if="autoCreationFormVisible"
                v-on-click-outside="hideAutoCreationForm">
                <AccountInput v-model="acconutAmountToCreate" placeholder="amount"/>
                <MyButton @on-click="createManyAccounts(acconutAmountToCreate)" text="create"/>
            </div>
            <div class="flex flex-row justify-between px-3">
                <div class="flex flex-row justify-between items-center">
                    <div class="flex flex-row px-3 py-1 rounded-lg space-x-3 bg-hover-primary-item-color" v-if="event.status !== 'revenue'">
                        <p class="text-white apple-font">Total Spent: {{ depositsSum }} $</p>
                    </div>
                    <div class="flex flex-row px-3 py-1 rounded-lg space-x-3 bg-hover-primary-item-color" v-if="event.status === 'revenue'">
                        <p class="text-white apple-font">Event Inome: {{ clearIncome }} $</p>
                    </div>
                </div>
                <div class="flex flex-row justify-between items-center px-3 w-[12rem]">
                    <LinkInput v-if="event.link === null" placeholder="Specify event link" v-model="link" @keypress.enter="updateEventLink"/>
                    <a v-else :href="event.link" target="_blank" class="flex flex-row items-center text-blue-300 space-x-1">
                        <i class="pi pi-link text-secondary-text-color"></i>
                        <p>link to event</p>
                    </a>
                </div>
                <div class="flex flex-row items-center px-3 py-1 rounded-lg space-x-3 bg-hover-primary-item-color" v-if="event.status === 'rewarded'">
                    <AccountInput v-if="event.rewardType === '' || event.rewardType === null" placeholder="Reward Token Name" v-model="rewardType" @keypress.enter="updateEventRewardType"/>
                    <p class="text-white apple-font" v-else>Reward: {{ event.rewardType }}</p>
                </div>
            </div>
            <div class="text-white apple-font p-4">
                <p class="text-[20px]">TODOLIST</p>
                <div class="text-secondary-text-color" @keypress.enter="createTask">
                    <p v-for="task in event.tasks" :key="task.id">- {{ task.header }}</p>
                    <AccountInput v-model="todo" placeholder="new task"/>
                </div>
            </div>
            <div class="flex flex-row w-full h-[45rem] px-4">
                <AccountContainer :event="event"/>
            </div>
            <div class="w-full flex flex-row p-4 justify-between">
                <div class="flex flex-row space-x-3 items-center">
                    <i class="text-white pi pi-clock"/>
                    <MyButton text="Set Date" @on-click="goToCalendar" v-if="isButtonVisible(event)"/>
                    <p v-if="!isButtonVisible(event) && !event.event" class="text-white cursor-pointer hover:text-gray-300 apple-font" @click="goToCalendar">{{ getStartDate(event) }} - {{ getEndDate(event) }}</p>
                    <p v-if="!isButtonVisible(event) && event.event" class="text-white apple-font">{{ getStartDate(event) }} - {{ getEndDate(event) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SavedEventManager from '@/manager/saved_event_manager';
import { computed, ref } from 'vue';
import SavedEventHeader from '@/components/event_components/SavedEventHeader.vue';
import AccountContainer from '@/components/event_components/account/AccountContainer.vue';
import { useRouter } from 'vue-router';
import MyButton from '@/components/basic_components/MyButton.vue';
import LinkInput from '@/components/basic_components/input/LinkInput.vue';
import DateUtils from '@/utils/date_utils';
import AccountInput from '@/components/basic_components/input/AccountInput.vue';
import AccountManager from '@/manager/account_manager';
import { vOnClickOutside } from '@vueuse/components'
import TaskManager from '@/manager/task_manager';

const router = useRouter();

const props = defineProps({
  id: Number
})

const close = () => {
    router.push({name: "managment" });
}

const event = computed(() => SavedEventManager.getById(props.id));

const link = ref()
const rewardType = ref();
const autoCreationFormVisible = ref(false);
const todo = ref();
const acconutAmountToCreate = ref(null);

const createTask = async () => {
    await TaskManager.createTask(event.value.id, { header: todo.value, description: "", completed: false });
    todo.value = "";
}

const depositsSum = computed(() => {
    let depositGeneral = 0;
    for(let i = 0 ; i < event.value.accounts.length; i ++) {
        const deposits = event.value.accounts[i].deposits;
        for(let j = 0; j < deposits.length; j ++) {
            depositGeneral += deposits[j].amount;
        }
    }
    return depositGeneral;
});

const incomesSum = computed(() => {
    let incomeGeneral = 0;
    for(let i = 0 ; i < event.value.accounts.length; i ++) {
        const withdraws = event.value.accounts[i].withdraws;
        for(let j = 0; j < withdraws.length; j ++) {
            incomeGeneral += withdraws[j].amount;
        }
    }
    return incomeGeneral;
});

const hideAutoCreationForm = () => {
    autoCreationFormVisible.value = false;
}

const clearIncome = computed(() => {
    return incomesSum.value - depositsSum.value;
})

const isButtonVisible = (event) => {
    if (getStartDate(event) === null && getEndDate(event) === null) {
        return true;
    }
    return false;
}

const getStartDate = (event) => {
    if (event.startDate === null){
        return null;
    }
    return DateUtils.stringToDate(event.startDate);
}

const getEndDate = (event) => {
    if (event.endDate === null){
        return null;
    }
    return DateUtils.stringToDate(event.endDate);
}

const updateEventLink = async () => {
    const _event = event.value;
    _event.link = link.value;

    await SavedEventManager.update(_event.id, _event);
}

const updateEventRewardType = async () => {
    const _event = event.value;
    _event.rewardType = rewardType.value;

    await SavedEventManager.update(_event.id, _event);
}

const goToCalendar = () => {
    router.push({name: "edit_calendar_event", params: { id: props.id }})
}

const createManyAccounts = async (amount: number) => {
    for (let i = 0; i < amount; i ++) {
        const account = {
            name: `acc${i + 1}`,
            deposits: [],
            rewards: [],
            withdraws: [],
        };

        await AccountManager.createAccount(props.id, account);
    }
}
</script>
