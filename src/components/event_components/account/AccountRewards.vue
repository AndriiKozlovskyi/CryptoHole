<template>
    <td class="px-2 py-2" v-on-click-outside="hideRewardInput" @keyup.enter="newReward">
        <div class="flex flex-col h-full items-start">

            <div class="flex flex-row space-x-2 items-center" v-if="!showAll">
                <p v-if="!rewardInputVisible" class="text-[16px] px-2 py-1 rounded-lg text-secondary-text-color font-apple">{{ totalRewardAmount }}</p>
                <AccountInput ref="rewardInputRef" v-if="rewardInputVisible" type="number" placeholder="new reward" v-model="reward"/>
                <div class="w-[1.8rem]">
                    <i 
                        class="pi pi-plus px-1 py-1 cursor-pointer text-white text-center rounded-full hover:bg-[#5a34c0] bg-[#522e91]" 
                        @click.stop="showRewardInput" 
                        v-if="!rewardInputVisible && hovered"
                        style="font-size: 0.8rem;"
                    />
                </div>
            </div>
            <table>
                <tbody v-if="showAll">
                    <tr class="flex flex-row items-center space-x-3 py-1" v-for="_reward in rewards" :key="_reward.date" >
                        <td class="apple-font text-secondary-text-color text-[13px]">{{ DateUtils.stringToDate(_reward.date) }}</td>
                        <td class="text-white">{{ _reward.amount }} </td>
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
import RewardResponse from '@/dtos/responses/reward_response';
import { vOnClickOutside } from '@vueuse/components'
import RewardRequest from '@/dtos/requests/reward_request';

const props = defineProps({
    rewards: Array<RewardResponse>,
    showAll: Boolean,
    hovered: Boolean,
    rewardType: String,
});

const emit = defineEmits(['toggleInput', 'updateReward', 'newReward']);

const totalRewardAmount = computed(() => {
  if (!props.rewards || props.rewards.length === 0) {
    return '-';
  }
  return props.rewards.reduce((sum, withdraw) => sum + (withdraw.amount || 0), 0) + " " + props.rewardType;
});

const reward = ref(null);
const rewardInputVisible = ref(false);
const rewardInputRef = ref(null);

const showRewardInput = async () => {
    rewardInputVisible.value = true;
    await nextTick();
    rewardInputRef.value.focus();
};

const hideRewardInput = () => {
    rewardInputVisible.value = false;
};
const updateReward = () => {

}

const newReward = () => {
    let amount = null;
    let date = null;
    if(reward.value !== null) {
        amount = reward.value
        date = DateUtils.formatDate(new Date());
    }
    const rewardValue: RewardRequest = { amount: amount, date: date }
    emit('newReward', rewardValue);
    hideRewardInput();
}

</script>
