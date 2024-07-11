<template>
    <div class="flex flex-col fixed w-[100%] left-0 h-[100%] top-0 items-center justify-center z-[1002]">
        <div class="fixed w-3/4 flex flex-col bg-primary-item-color rounded-md h-[35rem]">
            <div class="flex flex-row w-full p-3 items-center rounded-t-md bg-hover-primary-item-color">
                <div class="flex flex-row w-1/3 justify-start">
                    <div v-if="event.event === null" class="bg-blue-600 rounded-lg ml-6 px-3 bg-opacity-80">                    
                        <p class="apple-font text-white">Custom</p>
                    </div>
                    <div v-if="event.event !== null" class="flex flex-row cursor-pointer ml-6 items-center space-x-3 bg-green-600 hover:bg-green-700 rounded-lg px-3 bg-opacity-80" @click=goToDescription>                    
                        <p class="apple-font text-white">Go to description</p>
                        <i class="text-white pi pi-external-link"/>
                    </div>
                </div>
                <div class="flex flex-row w-1/3 justify-center">
                    <p class="text-white text-[25px] apple-font">{{ event?.name }}</p>
                </div>
                <div class="flex flex-row w-1/3 justify-end" @click="$emit('close')">
                    <i class="text-secondary-text-color cursor-pointer pi pi-times mr-6" style="font-size: 1.2rem;" @click="$emit('close')"/>
                </div>

            </div>
            <div class="flex flex-row justify-end items-center w-1/2 mt-6 mb-4 mr-10">
                <!-- <Select :status="event.status" @update-status="updateStatus" class=""/> -->
                <div class="flex flex-row cursor-pointer hover:bg-[#4619bd] bg-[#4c12b2] bg-opacity-70 space-x-3 rounded-lg px-6 mr-10 h-[28px] items-center hover:bg-hover-primary-item-color justify-start" @click="showCreationForm = true">
                    <i class="text-white pi pi-plus"/>
                    <p class="text-white apple-font">add account</p>
                </div>
            </div>
            <div class="flex flex-row w-full h-[20rem]">
                <div class="flex flex-col overflow-y-auto space-y-2 px-10 w-1/2">
                    <table class="w-full ">
                        <thead>
                            <tr>
                                <th :class="`text-white text-start text-[19px] font-apple px-2 py-2 ${event.status === 'paid' ? 'w-[40%]' : 'w-[80%]'}`">Name or wallet</th>
                                <th :class="`text-white text-start text-[19px] font-apple px-2 py-2 w-[20%]`">Deposit</th>
                                <th class="text-white text-start text-[19px] font-apple px-2 py-2 w-[20%]" v-if="event.status == 'paid'">Withdraw</th>
                                <th class="text-white text-start text-[19px] font-apple px-2 py-2 w-[20%]"  v-if="event.status == 'paid'">Income</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AccountCreationForm v-if="showCreationForm" :id="id" v-on-click-outside="hideCreationForm"/>
                            <AccountForm v-for="account in event.accounts" :key="account.id" :account="account" :event="event"/>
                        </tbody>
                    </table>
                </div>
                <Note class="flex flex-col px-10 items-start w-1/2"/>
            </div>
            <!-- <div class="w-full m-10 flex flex-row justify-between">
                <div class="flex flex-row space-x-3 items-center">
                    <i class="text-white pi pi-clock"/>
                    <p class="text-white apple-font">{{ new Date(String(event?.endDate)).toLocaleDateString() }} - {{ new Date(String(event?.endDate)).toLocaleDateString()  }}</p>
                </div>
            </div> -->
        </div>
    </div>
    <div class="flex flex-col fixed w-[100%] left-0 h-[100%] top-0 items-center justify-center bg-black opacity-50 z-[1001]">
    </div>
</template>

<script setup lang="ts">
import SavedEventManager from '@/manager/saved_event_manager';
import { computed, ref } from 'vue';
import AccountForm from "@/components/project_components/AccountForm.vue";
import AccountCreationForm from '@/components/project_components/AccountCreationForm.vue';
import { vOnClickOutside } from '@vueuse/components'
import Note from "@/components/project_components/Note.vue";
import Select from "@/components/basic_components/Select.vue";
import { useRouter } from 'vue-router'
import EventManager from '@/manager/event_manager';

const router = useRouter()

const props = defineProps({
  id: Number
})

defineEmits(['close']);

const showCreationForm = ref(true);

const hideCreationForm = () => {
    showCreationForm.value = false;
}

const event = computed(() => SavedEventManager.getById(props.id));
const updateStatus = (status: string) => {
  event.value.status = status;
  SavedEventManager.update(props.id, event.value)
}

const goToDescription = () => {
    const parentEvent = EventManager.getById(event.value.event);
    router.push({ name: 'project_description', params: { name: parentEvent.name } })
}

</script>
