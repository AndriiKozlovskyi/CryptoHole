<template>
    <div class="flex flex-col fixed w-[100%] left-0 h-[100%] top-0 items-center justify-center z-[102]">
        <div class="fixed w-2/3 flex flex-col bg-primary-item-color rounded-md gap-y-3">
            <SavedEventHeader :event="event" @close="close"/>
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
            <div class="flex flex-row w-full py-10 px-4">
                <AccountContainer :event="event"/>
            </div>
            <div class="w-full m-4 flex flex-row justify-between">
                <div class="flex flex-row space-x-3 items-center">
                    <i class="text-white pi pi-clock"/>
                    <MyButton text="Set Date" @on-click="goToCalendar" v-if="isButtonVisible(event)"/>
                    <p v-if="!isButtonVisible(event) && !event.event" class="text-white cursor-pointer hover:text-gray-300 apple-font" @click="goToCalendar">{{ getStartDate(event) }} - {{ getEndDate(event) }}</p>
                    <p v-if="!isButtonVisible(event) && event.event" class="text-white apple-font">{{ getStartDate(event) }} - {{ getEndDate(event) }}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col fixed w-[100%] left-0 h-[100%] top-0 items-center justify-center bg-black opacity-50 z-[101]">
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

</script>
