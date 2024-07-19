<template>
    <td class="px-2 py-2" v-on-click-outside="hideFinanceInput">
        <div class="flex flex-col h-full items-start ">

            <div class="flex flex-row space-x-2 items-center" v-if="!show">
                <p v-if="!financeInputVisible" class="text-[16px] px-2 py-1 rounded-lg text-secondary-text-color font-apple">{{ totalFinancesAmount }}</p>
                <AccountInput ref="financeInputRef" v-if="financeInputVisible" type="number" placeholder="new finance" v-model="finance" @keypress.enter="newFinance"/>
                <div class="w-[1.8rem]">
                    <i 
                        class="pi pi-plus px-1 py-1 cursor-pointer text-white text-center rounded-full hover:bg-[#5a34c0] bg-[#522e91]" 
                        @click.stop="showFinanceInput"
                        v-if="!financeInputVisible && hovered"
                        style="font-size: 0.8rem;"
                    />
                </div>
            </div>
            <table>
                <tbody v-if="show">
                    <tr 
                        class="flex flex-row items-center space-x-3 py-1" 
                        v-for="_finance in finances" :key="_finance.date" 
                    >
                        <div class="px-2 rounded-md flex flex-row items-center" :class="`${deleteHovered ? 'bg-[#464852]' : ''}`">
                            <FinanceDateForm :finance="_finance" @update="updateFinance"/>
                            <FinanceAmountForm :finance="_finance" @update="updateFinance"/>
                        </div>
                        <i 
                            class="pi pi-trash text-secondary-text-color cursor-pointer hover:text-white" 
                            style="font-size: 0.9rem" 
                            @mouseenter="deleteHovered = true"
                            @mouseleave="deleteHovered = false"
                            @click="deleteEntity(_finance.id)"
                        />
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
import { vOnClickOutside } from '@vueuse/components'
import FinanceAmountForm from './FinanceAmountForm.vue';
import FinanceDateForm from './FinanceDateForm.vue';

const props = defineProps({
    finances: Array<any>,
    show: Boolean,
    hovered: Boolean,
    rewardType: {
        required: false,
        value: String,
        default: "$"
    }
});

const emit = defineEmits(['delete', 'update', 'new']);
const totalFinancesAmount = computed(() => {
  if (!props.finances || props.finances.length === 0) {
    return '-';
  }
  return props.finances.reduce((sum, withdraw) => sum + (withdraw.amount || 0), 0) + ` ${props.rewardType}`;
});

const editingFinance = ref(null);

const finance = ref(null);
const financeInputVisible = ref(false);
const financeInputRef = ref(null);

const deleteHovered = ref(false);

const showFinanceInput = async () => {
    financeInputVisible.value = true;
    await nextTick();
    financeInputRef.value.focus();
};

const hideFinanceInput = () => {
    financeInputVisible.value = false;
    editingFinance.value = null;
};

const updateFinance = (upatedFinance) => {
    emit('update', upatedFinance);
    hideFinanceInput();
}

const newFinance = () => {
    let amount = null;
    let date = null;
    if(finance.value !== null) {
        amount = finance.value
        date = DateUtils.formatDate(new Date());
    }
    const financeValue = { amount: amount, date: date };
    emit('new', financeValue);
    hideFinanceInput();
}

const deleteEntity = (value) => {
    emit('delete', value);
}
</script>