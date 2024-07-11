<template>
    <tr class="w-[100%] bg-hover-primary-item-color" @keyup.enter="handleEnter">
    <td>   
        <MyInput
        ref="nameOrWalletRef"
        class="w-8"
        placeholder="name or wallet"
        v-model="nameOrWallet"
      /></td>
   
      <td >
        <MyInput
          ref="outcomeRef"
          class="w-8"
          v-model="outcome"
          type="number"
          placeholder="deposited"
        />
    </td>
    <td v-if="status === 'paid'">        
        <MyInput
          ref="incomeRef"
          class=""
          v-model="income"
          type="number"
          placeholder="withdrawed"
        />
    </td>
    <td v-if="status === 'paid'">        
    </td>
    </tr>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import MyInput from '../basic_components/input/MyInput.vue';
import AccountManager from '@/manager/account_manager';
import SavedEventManager from '@/manager/saved_event_manager';

const props = defineProps({
    id: Number,
});

const nameOrWallet = ref('');
const outcome = ref();
const income = ref();

const nameOrWalletRef = ref(null);
const outcomeRef = ref(null);
const incomeRef = ref(null);
const event = computed(() =>  SavedEventManager.getById(props.id));
const status = ref(event.value.status);

const save = async () => {
const account = {
    name: nameOrWallet.value,
    outcome: outcome.value,
    income: income.value,
};
await AccountManager.createAccount(props.id, account);
cleanForm();
};

const handleEnter = async (event) => {
    if (event.target === nameOrWalletRef.value.$refs.input && nameOrWallet.value) {
        outcomeRef.value.$refs.input.focus();
    } else if (event.target === outcomeRef.value.$refs.input && outcome.value && status.value === 'paid') {
        incomeRef.value.$refs.input.focus();
    } else if (event.target === outcomeRef.value.$refs.input && outcome.value && status.value !== 'paid'){
        save();
    }
    else if (event.target === incomeRef.value.$refs.input && income.value && status.value === 'paid'){
        save();
    }
};

onMounted(async () => {
    nameOrWalletRef.value.focus();
}); 

const cleanForm = () => {
    nameOrWallet.value = null;
    outcome.value = null;
    income.value = null;
    nameOrWalletRef.value.focus();
}

</script>