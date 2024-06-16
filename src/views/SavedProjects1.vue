<template>
  <div class="h-full w-full bg flex flex-col overflow-y-auto">
    <div class="flex flex-col h-full w-full items-center space-y-3 bg mt-[6rem]">
      <div class="flex flex-col h-full w-5/6 space-y-6">
        <p class="font-semibold text-2xl self-start text-white">
          Saved Projects
        </p>
        <div class="relative w-full h-full text-white flex flex-row gap-4 overflow-y-hidden">
          <div class="flex bg-[#141418] h-min rounded-xl flex-col w-min">
            <p class="font-bold p-5">TODO</p>
            <DragCon  v-for="project in projects" :key="project.name" :name="project.name">
              <ProjectBar class="relative h-[8rem]" :project="project"></ProjectBar>
            </DragCon>
            <DropZone id="todo"/>
            <div class="relative mr-4 flex flex-row py-3 px-3 items-center space-x-3 mb-5 cursor-pointer rounded-lg ml-4 bg-[#181a1d]">
              <i class="pi pi-plus text-white" style="font-size: 1.5rem; font-weight: 900;"/>
              <p>Add my project</p>
            </div>
          </div>
          <ProgressBar name="IN PROGRESS" id="progress"/>
          <ProgressBar name="WAITING FOR PAYMENT" id="waiting"/>
          <ProgressBar name="PAID" id="paid"/>
        </div>
        <i class="fixed cursor-pointer right-4 bottom-4 text-white pi pi-question-circle" style="font-size: 2rem" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import ProjectBar from '@/components/ProjectBar.vue';
import LocalStorageManager from '@/manager/local_storage_manager';
import { emitter } from '@/event_bus';
import DropZone from '@/components/DropZone.vue';
import DragCon from '@/components/DraggableContainer.vue';
import ProgressBar from "@/components/ProgressBar.vue"

const projects = ref(LocalStorageManager.getSavedProject());

onBeforeMount(() => {
  emitter.on("saveProject", () => {
    projects.value = LocalStorageManager.getSavedProject();
  });
  emitter.on("unsaveProject", () => {
    projects.value = LocalStorageManager.getSavedProject();
  });
  emitter.on("updateSavedProject", () => {
    projects.value = LocalStorageManager.getSavedProject();
  });
});

onMounted(() => {
  addProjectBarToDropZone();

})

const addProjectBarToDropZone = () => {
    const elementList = projects.value.map(project =>{
      return document.getElementById(project.name);
    })

    for(let i = 0; i < elementList.length; i ++) {
      for (let j = 0; j < projects.value.length; j ++) {
        const element = elementList[i];
        const project = projects.value[j];
        if(project.name === element.id) {
          switch (project.status) {
            case "todo":
                addElement (element, "todo");
                break;
            case "progress":
              addElement (element, "progress");            
              break;
            case "waiting":
                addElement (element, "waiting");
                break;
            case "paid":
              addElement (element, "paid");            
              break;
          }
        }
      }
    }

}
const addElement = (el, id) => {
  document.getElementById(id).appendChild(el);
  console.log(document.getElementById(id))
  el.style.position = "relative";
  el.style.paddingLeft = '1rem'
  el.style.paddingRight = '1rem'
  el.style.left = '0px';
  el.style.top = '0px';
  el.classList.remove("dragging");

}

</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
