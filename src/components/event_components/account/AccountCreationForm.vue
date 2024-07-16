<template>
    <tr class="bg-hover-primary-item-color" @keyup.enter="handleEnter">
        <td>   
            <MyInput
            ref="nameOrWalletRef"
            class="w-8"
            placeholder="name or wallet"
            v-model="nameOrWallet"
        /></td>
    
        <td >
            <MyInput
            ref="depositRef"
            class="w-8"
            v-model="deposit"
            type="number"
            placeholder="deposited"
            />
        </td>

        <td v-if="status === 'rewarded'" >
            <MyInput
            ref="rewardRef"
            class="w-8"
            v-model="reward"
            type="number"
            placeholder="reward"
            />
        </td>
        <td v-if="status === 'revenue'">        
            <MyInput
            ref="withdrawRef"
            class="w-8"
            v-model="withdraw"
            type="number"
            placeholder="withdrawed"
            />
        </td>
        <td v-if="status === 'revenue'">        
        </td>
        <td>        
        </td>
    </tr>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import MyInput from '@/components/basic_components/input/MyInput.vue';
import AccountManager from '@/manager/account_manager';
import SavedEventManager from '@/manager/saved_event_manager';
import DateUtils from '@/utils/date_utils';

const props = defineProps({
    id: Number,
});

const nameOrWallet = ref('');
const deposit = ref(null);
const withdraw = ref(null);
const reward = ref(null);

const nameOrWalletRef = ref(null);
const depositRef = ref(null);
const rewardRef = ref(null);
const withdrawRef = ref(null);
const event = computed(() =>  SavedEventManager.getById(props.id));
const status = ref(event.value.status);

const save = async () => {
    const deposits = getFinancesInfo(deposit.value);
    const rewards = getFinancesInfo(reward.value);
    const withdraws = getFinancesInfo(withdraw.value);

    const account = {
        name: nameOrWallet.value,
        deposits: deposits,
        rewards: rewards,
        withdraws: withdraws,
    };

    await AccountManager.createAccount(props.id, account);
    cleanForm();
};

const getFinancesInfo = (value: number | null) => {
    if (value === null) {
        return [];
    }
    return [{amount: value, date: DateUtils.formatDate(new Date)}];
}

const handleEnter = async (event) => {
    if (event.target === nameOrWalletRef.value.$refs.input && nameOrWallet.value) {
        depositRef.value.$refs.input.focus();
        return;
    } else if (event.target === depositRef.value.$refs.input && status.value === 'revenue') {
        withdrawRef.value.$refs.input.focus();
        return;
    } else if (event.target === depositRef.value.$refs.input && status.value === 'rewarded') {
        rewardRef.value.$refs.input.focus();
        return;
    } else {
        save();
    }
}

onMounted(async () => {
    nameOrWalletRef.value.focus();
}); 

const cleanForm = () => {
    nameOrWallet.value = null;
    deposit.value = null;
    withdraw.value = null;
    reward.value = null;
    nameOrWalletRef.value.focus();
}

</script>