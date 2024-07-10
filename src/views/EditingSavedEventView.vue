<template>
    <div class="flex flex-col fixed w-[100%] left-0 h-[100%] top-0 items-center justify-center z-[1002]">
        <div class="fixed w-2/3 flex flex-col bg-primary-item-color rounded-md">
            <div class="absolute right-1 top-1" @click="$emit('close')">
                <i class="text-secondary-text-color cursor-pointer pi pi-times"/>
            </div>
            <div class="flex flex-row justify-center p-3 items-center">
                <p class="text-white text-[20px] apple-font">{{event?.name}}</p>
            </div>
            <div class="flex flex-col justify-center space-y-2 p-3 items-start">
                <div class="flex w-full flex-col space-y-2" v-for="account in event.accounts" :key="account.id">
                    <AccountForm  :account="account"/>
                </div>
                <AccountCreationForm :id="id"/>
            </div>
        </div>
    </div>
    <div class="flex flex-col fixed w-[100%] left-0 h-[100%] top-0 items-center justify-center bg-hover-primary-item-color opacity-50 z-[1001]">
    </div>
</template>
<script setup lang="ts">
import SavedEventManager from '@/manager/saved_event_manager';
import { computed } from 'vue';
import AccountForm from "@/components/project_components/AccountForm.vue";
import AccountCreationForm from '@/components/project_components/AccountCreationForm.vue';
const props = defineProps({
  id: Number
})

defineEmits(['close']);

const event = computed(() => SavedEventManager.getById(props.id))
</script>