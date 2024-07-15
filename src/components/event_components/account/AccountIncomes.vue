<template>
    <td class="px-2 py-2" v-on-click-outside="hideIncomeInput" @keyup.enter="newIncome">
        <div class="flex flex-row space-x-4 items-center" v-if="!showAll">
            <p v-if="!incomeInputVisible" class="text-[16px] px-2 py-1 rounded-lg text-white font-apple">{{ totalIncomeAmount }} $</p>
            <AccountInput v-if="incomeInputVisible" type="number" placeholder="new income" v-model="income"/>
            <i class="pi pi-plus text-white" @click.stop="showIncomeInput" v-if="!incomeInputVisible"/>
        </div>
        <table v-if="showAll">
            <tbody>
                <tr class="flex flex-row items-center space-x-3 py-1" v-for="_income in incomes" :key="_income.date" >
                    <td class="apple-font text-secondary-text-color text-[13px]">{{ DateUtils.stringToDate(_income.date) }}</td>
                    <td class="text-white">{{ _income.amount }} $</td>
                </tr>
            </tbody>
        </table>
    </td>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from 'vue';
import DateUtils from '@/utils/date_utils';
import AccountInput from '@/components/basic_components/input/AccountInput.vue';
import IncomeResponse from '@/dtos/responses/incomes_response';
import { vOnClickOutside } from '@vueuse/components'
import IncomeRequest from '@/dtos/requests/income_request';

const props = defineProps({
    incomes: Array<IncomeResponse>,
    showAll: Boolean,
});

const emit = defineEmits(['toggleInput', 'updateIncome', 'newIncome']);

const totalIncomeAmount = computed(() => props.incomes!.reduce((sum, income) => sum + (income.amount || 0), 0));
const income = ref();
const incomeInputVisible = ref(false);

const showIncomeInput = () => {
    incomeInputVisible.value = true;
};

const hideIncomeInput = () => {
    incomeInputVisible.value = false;
};
const updateIncome = () => emit('updateIncome', income.value);

const newIncome = () => {
    const incomeValue: IncomeRequest = { amount: income.value, date: DateUtils.formatDate(new Date()) }
    emit('newIncome', incomeValue);
    hideIncomeInput();
}
</script>
<style>
td {
  vertical-align: top;
}</style>
