<template>
<td class="text-white apple-font">
    <p class="text-secondary-text-color" v-if="!show">{{getCompletedTasks}}</p>
    <div class="text-secondary-text-color" v-if="show">
        <p v-for="task in tasks" :key="task.id">
        <input type="checkbox" @click.stop v-model="task.completed" @input="onCheckboxChange(task)"/> {{ task.header }}</p>
    </div>
</td>
</template>
<script lang="ts" setup>
import TaskResponse from '@/dtos/responses/task_response';
import TaskManager from '@/manager/task_manager';
import { computed } from 'vue';

const props = defineProps({
    tasks: Array<TaskResponse>,
    show: Boolean    
});

const getCompletedTasks = computed(() => {
    let completedCount = 0;
    for (let i = 0; i < props.tasks.length; i ++) {
        if (props.tasks[i].completed) {
            completedCount ++;
        }
    }

    return `${completedCount}/${props.tasks.length}`
})

const onCheckboxChange = async (task) => {
    const _task = task;
    _task.completed = !task.completed;
    await TaskManager.update(task.id, _task)
}
</script>