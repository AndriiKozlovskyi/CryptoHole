<template>
    <div class="flex rounded-md w-1/2 flex-row bg-hover-primary-item-color items-center space-x-3 px-2 justify-between" @keyup.enter="handleEnter">
      <MyInput
        ref="nameOrWalletRef"
        class="w-8"
        placeholder="name or wallet"
        v-model="nameOrWallet"
      />
      <div class="flex flex-row space-x-2 items-center">
        <MyInput
          ref="outcomeRef"
          class="w-8"
          v-model="outcome"
          placeholder="spent"
        />
        <MyInput
          ref="incomeRef"
          class=""
          v-model="income"
          placeholder="earned"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import MyInput from '../basic_components/input/MyInput.vue';
  import AccountManager from '@/manager/account_manager';
  
  const props = defineProps({
    id: Number,
  });
  
  const nameOrWallet = ref('');
  const outcome = ref();
  const income = ref();
  
  const nameOrWalletRef = ref(null);
  const outcomeRef = ref(null);
  const incomeRef = ref(null);
  
  const save = async () => {
    const account = {
      name: nameOrWallet.value,
      outcome: outcome.value,
      income: income.value,
    };
    await AccountManager.createAccount(props.id, account);
  };
  
  const handleEnter = async (event) => {
  if (event.target === nameOrWalletRef.value.$refs.input && nameOrWallet.value) {
    outcomeRef.value.$refs.input.focus();
  } else if (event.target === outcomeRef.value.$refs.input && outcome.value) {
    incomeRef.value.$refs.input.focus();
  } else if (event.target === incomeRef.value.$refs.input && income.value) {
    save();
  }
};
  
  onMounted(async () => {
    nameOrWalletRef.value.focus();
  });

  </script>
