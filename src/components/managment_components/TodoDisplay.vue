<template>
    <div class="text-white apple-font p-4 space-y-3">
        <p class="text-[20px] font-medium">TODOLIST</p>
        <div class="text-secondary-text-color">
            <div class="" v-for="task in event.tasks" :key="task.id">
                <TodoItem :task="task" @update="updateTask" @delete="deleteTask"/>
            </div>
            <AccountInput v-model="todo" placeholder="new task" @keypress.enter="createTask"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import TaskManager from '@/manager/task_manager';
import { PropType, ref } from 'vue';
import SavedEvent from '@/models/saved_event_model';
import TodoItem from './TodoItem.vue';
import AccountInput from '../basic_components/input/AccountInput.vue';

const props = defineProps({
    event: Object as PropType<SavedEvent>
});

const todo = ref();
const event = ref(props.event);

const createTask = async () => {
    await TaskManager.createTask(event.value.id, { header: todo.value, description: "", completed: false });
    todo.value = "";
}

const updateTask = async (task) => {
    await TaskManager.update(task.id, task);
}

const deleteTask = async (taskId) => {
    await TaskManager.deleteTask(taskId);
}

</script>