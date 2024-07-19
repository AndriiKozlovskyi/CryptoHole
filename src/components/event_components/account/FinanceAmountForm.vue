<template>
    <td @click="showEditField" v-on-click-outside="hideEditingField" @keypress.enter="update">
        <p v-if="!isEditing" class="text-white hover:bg-[#464852] px-1 rounded-md">{{ amount }}</p>
        <AccountInput v-else v-model="amount"/>
    </td>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AccountInput from '@/components/basic_components/input/AccountInput.vue';
import { vOnClickOutside } from '@vueuse/components'

const props = defineProps({
    finance: Object,
});

const emit = defineEmits(['update']);

const isEditing = ref(false);

const amount = ref(props.finance.amount);

const showEditField = () => {
    isEditing.value = true;
}

const hideEditingField = () => {
    isEditing.value = false;
}

const update = () => {
    const _finance = props.finance;
    _finance.amount = amount.value;
    emit('update', _finance);
    hideEditingField();
}

</script>

<style scoped>
/* Add any specific styles for this component here */
</style>
