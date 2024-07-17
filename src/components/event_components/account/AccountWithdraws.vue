<template>
    <td class="px-2 py-2" v-on-click-outside="hideWithdrawInput" @keyup.enter="newWithdraw">
        <div class="flex flex-row space-x-4 items-center" v-if="!showAll">
            <p v-if="!withdrawInputVisible" class="text-[16px] px-2 py-1 rounded-lg text-secondary-text-color font-apple">{{ totalWithdrawAmount }}</p>
            <AccountInput v-if="withdrawInputVisible" ref="incomeInputRef" type="number" placeholder="new income" v-model="withdraw"/>
            <div class="w-[1.8rem]">
                <i 
                    class="pi pi-plus px-1 py-1 text-white text-center rounded-full hover:bg-[#5a34c0] bg-[#522e91]" 
                    @click.stop="showWithdrawInput"
                    v-if="!withdrawInputVisible && hovered"
                    style="font-size: 0.8rem;"
                />
            </div>
        </div>
        <table v-if="showAll">
            <tbody>
                <tr class="flex flex-row items-center space-x-3 py-1" v-for="_withdraw in withdraws" :key="_withdraw.date" >
                    <td class="apple-font text-secondary-text-color text-[13px]">{{ DateUtils.stringToDate(_withdraw.date) }}</td>
                    <td class="text-white">{{ _withdraw.amount }} $</td>
                </tr>
            </tbody>
        </table>
    </td>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, nextTick } from 'vue';
import DateUtils from '@/utils/date_utils';
import AccountInput from '@/components/basic_components/input/AccountInput.vue';
import WithdrawResponse from '@/dtos/responses/withdraw_response';
import { vOnClickOutside } from '@vueuse/components'
import WithdrawRequest from '@/dtos/requests/withdraw_request';

const props = defineProps({
    withdraws: Array<WithdrawResponse>,
    showAll: Boolean,
    hovered: Boolean,
});

const emit = defineEmits(['toggleWithdraw', 'updateWithdraw', 'newWithdraw']);

const totalWithdrawAmount = computed(() => {
  if (!props.withdraws || props.withdraws.length === 0) {
    return 'no withdraws';
  }
  return props.withdraws.reduce((sum, withdraw) => sum + (withdraw.amount || 0), 0) + " $";
});

const withdraw = ref(null);
const withdrawInputVisible = ref(false);
const withdrawInputRef = ref(null);

const showWithdrawInput = async () => {
    withdrawInputVisible.value = true;
    await nextTick();
    withdrawInputRef.value.focus();
};

const hideWithdrawInput = () => {
    withdrawInputVisible.value = false;
};
const updateWithdraw = () => emit('updateWithdraw', withdraw.value);

const newWithdraw = () => {
    let amount = null;
    let date = null;
    if(withdraw.value !== null) {
        amount = withdraw.value
        date = DateUtils.formatDate(new Date());
    }

    console.log(amount + "  " + date)
    const withdrawValue: WithdrawRequest = { amount: amount, date: date }
    emit('newWithdraw', withdrawValue);
    hideWithdrawInput();
}
</script>
<style>
td {
  vertical-align: top;
}
</style>
