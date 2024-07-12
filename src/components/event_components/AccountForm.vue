<template>
    <tr 
        class="rounded-md border-b border-t hover:bg-hover-primary-item-color cursor-pointer w-full h-[3rem] border-secondary-text-color"
        :class="{ [`bg-hover-primary-item-color`]: editing }"
        @keypress.enter="handleEnter" 
        v-on-click-outside="stopEdit"
        @contextmenu.prevent="onEventRightClick($event)"
        @click="edit">
        <td>
            <div class="flex flex-row space-x-4 items-center">
                <p v-if="!editing" class="text-secondary-text-color text-[18px] font-apple cursor-pointer hover:text-white px-2 py-2" @click.stop="copy">
                    {{ name }}
                </p>
                <MyInput ref="nameOrWalletRef" v-if="editing" v-model="name"/>
            </div>
        </td>
        <td class="px-2 py-2">
            <div class="flex flex-row space-x-4 items-center">
                <p v-if="!editing" class="text-[16px] px-2 py-1 rounded-lg text-white font-apple">{{ account.outcome }} $</p>
                <MyInput ref="outcomeRef" v-if="editing" v-model="outcome"/>
            </div>
        </td>
        <td class="px-2 py-2" v-if="event.status === 'paid'">
            <div class="flex flex-row space-x-4 items-center" >
                <p v-if="!editing" class="text-[16px] px-2 py-1 rounded-lg text-white font-apple">{{ account.income }} $</p>
                <MyInput ref="incomeRef" v-if="editing" v-model="income"/>
            </div>
        </td>
        <td :class="`px-2 py-2 ${clearIncome < 0 ? 'bg-opacity-15 bg-red-500' : 'bg-opacity-20 bg-green-700'}`" v-if="event.status === 'paid'">
            <div class="flex flex-row space-x-4 items-center">
                <p class="text-[16px] px-2 py-1 rounded-lg text-white font-apple">{{ clearIncome }} $</p>
            </div>
        </td>
    </tr>
</template>

<script setup lang="ts">
import ToastManager from '@/manager/toaster_manager'
import { useToast } from 'primevue/usetoast'
import { PropType, computed, ref, nextTick, inject } from 'vue';
import MyInput from '../basic_components/input/MyInput.vue';
import Account from '@/models/account_model';
import { vOnClickOutside } from '@vueuse/components'
import AccountManager from '@/manager/account_manager';
import SavedEvent from '@/models/saved_event_model';
import { emitter } from '@/event_bus';

const props = defineProps({
    account: Object as PropType<Account>,
    event: Object as PropType<SavedEvent>,
});

const menu = ref(inject("contextMenuForAccounts"));

const toast = useToast()

const outcome = ref(props.account?.outcome);
const income = ref(props.account?.income);
const name = ref(props.account?.name)
const clearIncome = computed(() => income.value - outcome.value);

const nameOrWalletRef = ref(null);
const outcomeRef = ref(null);
const incomeRef = ref(null);

const editing = ref(false);

const edit = async (event) => {
    editing.value = true;
    await nextTick();
    if(event.target !== nameOrWalletRef.value.$refs.input && event.target !== outcomeRef.value.$refs.input && event.target !== incomeRef.value?.$refs.input ) {
        nameOrWalletRef.value.focus();
    }
}

const stopEdit = () => {
    editing.value = false;
}
const save = async () => {
    const account = {
        name: name.value,
        outcome: outcome.value,
        income: income.value,
    };
    await AccountManager.update(props.account.id, account);
    stopEdit();
};

const copy = async () => {
    await navigator.clipboard.writeText(props.account.name);
    ToastManager.showInfoToast(toast, "address copied")
}

const handleEnter = async (event) => {
    if (event.target === nameOrWalletRef.value.$refs.input && name.value) {
        outcomeRef.value.$refs.input.focus();
    } else if (event.target === outcomeRef.value.$refs.input && outcome.value && props.event.status === 'paid') {
        incomeRef.value.$refs.input.focus();
    } else if (event.target === outcomeRef.value.$refs.input && outcome.value && props.event.status !== 'paid'){
        save();
    }
    else if (event.target === incomeRef.value.$refs.input && income.value && props.event.status === 'paid'){
        save();
    }
};

const onEventRightClick = (event) => {
  menu.value.show(event)
  emitter.emit("contextMenu", props.account.id);
}

</script>
