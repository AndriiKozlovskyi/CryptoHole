<template>
    <div class=" flex rounded-md w-1/2 flex-row bg-hover-primary-item-color items-center space-x-3 px-2 py-2 justify-between">
        <p class="text-secondary-text-color font-apple cursor-pointer hover:text-white" @click="copy">{{ account?.name }}</p>
        <div class="flex flex-row space-x-4 items-center">
            <p v-if="showEditing == false" class="text-[16px] text-secondary-text-color font-apple" @click="showEditing = true">12$</p>
            <MyInput class="bg-secondary-text-color w-8" v-if="showEditing == true" v-model="outcome"/>
            <p v-if="showEditing == false" class="text-[16px] text-secondary-text-color font-apple">23$</p>
            <MyInput class="bg-secondary-text-color w-8" v-if="showEditing == true" v-model="income"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import ToastManager from '@/manager/toaster_manager'
import { useToast } from 'primevue/usetoast'
import { PropType, ref } from 'vue';
import MyInput from '../basic_components/input/MyInput.vue';
import Account from '@/models/account_model';

const props = defineProps({
   account: Object as PropType<Account> 
});

const toast = useToast()

const outcome = ref(props.account?.outcome);
const income = ref(props.account?.income);

const copy = async () => {
    await navigator.clipboard.writeText("0x6e43F45F3e2ebc1693e2A0d504c3f6D0DfF6bB10");
    ToastManager.showInfoToast(toast, "address copied")
}

const showEditing = ref(false);


</script>