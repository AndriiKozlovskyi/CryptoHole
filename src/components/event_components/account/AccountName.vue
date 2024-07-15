<template>
    <td>
        <div class="flex flex-row space-x-4 items-center">
            <p v-if="!editing" class="text-secondary-text-color text-[18px] font-apple cursor-pointer hover:text-white px-2 py-2" @click.stop="copy">
                {{ name }}
            </p>
            <AccountInput v-if="editing" v-model="name"/>
        </div>
    </td>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import AccountInput from '@/components/basic_components/input/AccountInput.vue';
import ToastManager from '@/manager/toaster_manager'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const props = defineProps({
    name: String,
    editing: Boolean,
});

const emit = defineEmits(['edit', 'copy']);

const name = ref(props.name);

const edit = () => emit('edit');
const copy = async () => {
    await navigator.clipboard.writeText(props.name!);
    ToastManager.showInfoToast(toast, "address copied")
}</script>
