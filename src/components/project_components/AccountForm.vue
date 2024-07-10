<template>
    <tr class="rounded-md border-b border-t w-full h-[3rem] border-secondary-text-color" @keypress.enter="save" v-on-click-outside="stopEdit">
        <td class="text-secondary-text-color text-[18px] font-apple cursor-pointer hover:text-white px-2 py-2" @click="copy">{{ account?.name }}</td>
        <td class="px-2 py-2">
            <div class="flex flex-row space-x-4 items-center">
                <p v-if="!showEditing" class="text-[16px] px-2 py-1 rounded-lg text-white font-apple" @click.stop="edit">{{ account.outcome }} $</p>
                <MyInput v-if="showEditing" v-model="outcome"/>
            </div>
        </td>
        <td class="px-2 py-2" v-if="event.status === 'paid'">
            <div class="flex flex-row space-x-4 items-center" >
                <p v-if="!showEditing" class="text-[16px] px-2 py-1 rounded-lg text-white font-apple" @click.stop="edit">{{ account.income }} $</p>
                <MyInput class="" v-if="showEditing" v-model="income"/>
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
import { PropType, computed, ref } from 'vue';
import MyInput from '../basic_components/input/MyInput.vue';
import Account from '@/models/account_model';
import { vOnClickOutside } from '@vueuse/components'
import AccountManager from '@/manager/account_manager';
import SavedEvent from '@/models/saved_event_model';

const props = defineProps({
    account: Object as PropType<Account>,
    event: Object as PropType<SavedEvent>,
});

const toast = useToast()

const outcome = ref(props.account?.outcome);
const income = ref(props.account?.income);
const clearIncome = computed(() => income.value - outcome.value);
const showEditing = ref(false);

const edit = () => {
    showEditing.value = true;
}

const stopEdit = () => {
    showEditing.value = false;
}
const save = async () => {
    const account = {
        name: props.account.name,
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


</script>
