<template>
    <td class="px-2 py-2" v-on-click-outside="hideDepositInput" @keyup.enter="newDeposit">
        <div class="flex flex-col h-full items-start ">

            <div class="flex flex-row space-x-2 items-center" v-if="!showAll">
                <p v-if="!depositInputVisible" class="text-[16px] px-2 py-1 rounded-lg text-secondary-text-color font-apple">{{ totalDepositAmount }}</p>
                <AccountInput ref="depositInputRef" v-if="depositInputVisible" type="number" placeholder="new deposit" v-model="deposit"/>
                <div class="w-[1.8rem]">
                    <i 
                        class="pi pi-plus px-1 py-1 cursor-pointer text-white text-center rounded-full hover:bg-[#5a34c0] bg-[#522e91]" 
                        @click.stop="showDepositInput"
                        v-if="!depositInputVisible && hovered"
                        style="font-size: 0.8rem;"
                    />
                </div>
     
            </div>
            <table>
                <tbody v-if="showAll">
                    <tr class="flex flex-row items-center space-x-3 py-1" v-for="deposit in deposits" :key="deposit.date" >
                        <td class="apple-font text-secondary-text-color text-[13px]">{{ DateUtils.stringToDate(deposit.date) }}</td>
                        <td class="text-white">{{ deposit.amount }} $</td>
                    </tr>
                </tbody>
            </table>
        </div>    
    </td>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, nextTick } from 'vue';
import DateUtils from '@/utils/date_utils';
import AccountInput from '@/components/basic_components/input/AccountInput.vue';
import DepositResponse from '@/dtos/responses/deposit_response';
import { vOnClickOutside } from '@vueuse/components'
import DepositRequest from '@/dtos/requests/deposit_request';

const props = defineProps({
    deposits: Array<DepositResponse>,
    showAll: Boolean,
    hovered: Boolean,
});

const emit = defineEmits(['toggleInput', 'updateDeposit', 'newDeposit']);
const totalDepositAmount = computed(() => {
  if (!props.deposits || props.deposits.length === 0) {
    return '-';
  }
  return props.deposits.reduce((sum, withdraw) => sum + (withdraw.amount || 0), 0) + " $";
});

const deposit = ref(null);
const depositInputVisible = ref(false);
const depositInputRef = ref(null);

const showDepositInput = async () => {
    depositInputVisible.value = true;
    await nextTick();
    depositInputRef.value.focus();
};

const hideDepositInput = () => {
    depositInputVisible.value = false;
};
const updateDeposit = () => {

}

const newDeposit = () => {
    let amount = null;
    let date = null;
    if(deposit.value !== null) {
        amount = deposit.value
        date = DateUtils.formatDate(new Date());
    }
    const depositValue: DepositRequest = { amount: amount, date: date };
    emit('newDeposit', depositValue);
    hideDepositInput();
}

</script>
