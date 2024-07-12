<template>
    <div class="flex flex-col fixed w-[100%] left-0 h-[100%] top-0 items-center justify-center z-[1002]">
        <div class="fixed w-2/3 flex flex-col bg-primary-item-color rounded-md gap-y-3">
            <SavedEventHeader :event="event" @close="close"/>
            <div class="flex flex-row justify-between items-center px-4 ">
                <div class="flex flex-row px-3 py-1 rounded-lg space-x-3 bg-hover-primary-item-color" v-if="event.status !== 'paid'">
                    <p class="text-white apple-font">Total Spent: {{ calculateDepositsSum() }} $</p>
                </div>
                <div class="flex flex-row px-3 py-1 rounded-lg space-x-3 bg-hover-primary-item-color" v-if="event.status === 'paid'">
                    <p class="text-white apple-font">Event Inome: {{ calculateIncomeSum() }} $</p>
                </div>
            </div>
            <div class="flex flex-row w-full py-10 px-4">
                <AccountContainer :event="event"/>
            </div>
            <div class="w-full m-10 flex flex-row justify-between">
                <div class="flex flex-row space-x-3 items-center">
                    <i class="text-white pi pi-clock"/>
                    <MyButton text="Set Date" @on-click="goToCalendar" v-if="isButtonVisible(event)"/>
                    <p v-if="!isButtonVisible(event) && !event.event" class="text-white cursor-pointer hover:text-gray-300 apple-font" @click="goToCalendar">{{ getStartDate(event) }} - {{ getEndDate(event) }}</p>
                    <p v-if="!isButtonVisible(event) && event.event" class="text-white apple-font">{{ getStartDate(event) }} - {{ getEndDate(event) }}</p>

                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col fixed w-[100%] left-0 h-[100%] top-0 items-center justify-center bg-black opacity-50 z-[1001]">
    </div>
</template>

<script setup lang="ts">
import SavedEventManager from '@/manager/saved_event_manager';
import { computed } from 'vue';
import SavedEventHeader from '@/components/event_components/SavedEventHeader.vue';
import AccountContainer from '@/components/event_components/AccountContainer.vue';
import { useRouter } from 'vue-router';
import MyButton from '@/components/basic_components/MyButton.vue';

const router = useRouter();

const props = defineProps({
  id: Number
})

const close = () => {
    router.push({name: "managment" });
}

const event = computed(() => SavedEventManager.getById(props.id));

const calculateDepositsSum = () => {
    let depositGeneral = 0;
    for(let i = 0 ; i < event.value.accounts.length; i ++) {
        const deposit = event.value.accounts[i].outcome;
        depositGeneral += deposit;
    }
    return depositGeneral;
}

const calculateIncomeSum = () => {
    let incomeGeneral = 0;
    for(let i = 0 ; i < event.value.accounts.length; i ++) {
        const income = event.value.accounts[i].income - event.value.accounts[i].outcome;
        incomeGeneral += income;
    }
    return incomeGeneral;
}

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
    return new Date(String(event.startDate)).toLocaleDateString()
}

const getEndDate = (event) => {
    if (event.endDate === null){
        return null;
    }
    return new Date(String(event.endDate)).toLocaleDateString()
}

const goToCalendar = () => {
    router.push({name: "edit_calendar_event", params: { id: props.id }})
}

</script>
