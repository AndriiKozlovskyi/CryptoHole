<template>
    <td class="px-2 py-2">
        <div class="flex flex-row items-center space-x-3" v-on-click-outside="stopEditing" @keypress.enter="save">
            <p v-if="!isEditing" class="text-secondary-text-color text-center text-[18px] font-apple cursor-pointer hover:text-white" @click.stop="copy">
                {{ name }}
            </p>
            <div class="w-[0.8rem]">
                <i v-if="hovered && !isEditing" class="text-white pi pi-pencil cursor-pointer hover:text-secondary-text-color" @click="edit"/>
            </div>

            <AccountInput v-if="isEditing" ref="nameRef" v-model="name"/>
        </div>
    </td>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, nextTick } from 'vue';
import AccountInput from '@/components/basic_components/input/AccountInput.vue';
import ToastManager from '@/manager/toaster_manager'
import { useToast } from 'primevue/usetoast'
import { vOnClickOutside } from '@vueuse/components'

const toast = useToast()

const props = defineProps({
    name: String,
    hovered: Boolean
});

const emit = defineEmits(['update']);

const name = ref(props.name);
const nameRef = ref(null);
const isEditing = ref(false);

const edit = async () => {
    isEditing.value = true;
    await nextTick();
    nameRef.value.focus();
};

const save = () => {
    emit('update', name.value);
    stopEditing();
}

const stopEditing = () => {
    isEditing.value = false;
}

const copy = async () => {
    await navigator.clipboard.writeText(props.name!);
    ToastManager.showInfoToast(toast, "address copied")
}

</script>