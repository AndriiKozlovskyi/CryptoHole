<template>
    <div class="flex flex-row items-center space-x-2">
        <p v-if="!editing" class="w-max px-2 rounded-md text-white hover:bg-[#3c3d41]" @click="showInput">- {{ task.header }}</p>
        <AccountInput v-else v-model="header" v-on-click-outside="hideInput" @keypress.enter="updateTaskHeader"/>
        <i class="pi pi-trash hover:text-white" @click="deleteTaskHeader"/>
    </div>
</template>
<script lang="ts" setup>
import TaskResponse from '@/dtos/responses/task_response';
import { PropType, ref } from 'vue';
import AccountInput from '../basic_components/input/AccountInput.vue';
import { vOnClickOutside } from '@vueuse/components'

const props = defineProps({
    task: Object as PropType<TaskResponse>
});

const emit = defineEmits(["update", "delete"]);

const editing = ref(false);
const task = ref(props.task);
const header = ref(task.value.header)

const showInput = () => {
    editing.value = true;
}

const hideInput = () => {
    editing.value = false;
}

const updateTaskHeader = () => {
    const _task = task.value;
    _task.header = header.value;
    emit('update', _task)
    hideInput();
}

const deleteTaskHeader = () => {
    emit('delete', task.value.id)
}

</script>