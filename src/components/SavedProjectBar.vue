<template>
    <div class="relative flex items-color h-[5rem] hover:bg-[#28292e] overflow-hidden w-full flex-col rounded-lg tracking-tight cursor-pointer transition-[transform] active:scale-[0.99] group"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"        
    >  
        <!--tag-->
    
        <!--lowwer bar-->
        <div class="flex flex-row justify-between px-5">
            <!--name-->
            <div class="apple-font text-white text-xl mt-3 font-normal">
                {{ project?.name }}
            </div>
            <div class="flex flex-row items-center text-white text-sm ">
                <button 
                    class="px-3 py-3" 
                    @click="decreaseAccs" 
                    @mousedown.stop
                    v-if="hovered"
                >-</button>
                <p>{{ project?.amountOfAccs }}</p>
                <button 
                    class="px-3 py-3" 
                    @click="increaseAccs" 
                    @mousedown.stop
                    v-if="hovered"
                >+</button>
            </div>
        </div>
            <!--lowwer bar-->
        <div class="flex flex-row px-5 justify-between items-end w-full rounded-full text-sm text-white">
            <!--expenses-->
            <div class="flex flex-row space-x-1 mb-5 items-center">
                <img width="16px" heig1ht="16px" src="https://cryptologos.cc/logos/tether-usdt-logo.png"/>

                <p class="font-semibold text-[14px] text-gray-300">
                    {{ project?.expenses }}
                </p>
            </div>
            
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type {SavedProject} from "@/entity/saved_project";
import type { PropType } from 'vue';

const props = defineProps({
  project: Object as PropType<SavedProject>,
});
const hovered = ref(false);
const project = ref(props.project);

const emit = defineEmits(['dragSwitch'])

const increaseAccs = () => {
    emit('dragSwitch');
    project.value!.amountOfAccs = project.value!.amountOfAccs + 1;
    emit('dragSwitch');
}

const decreaseAccs = () => {
    emit('dragSwitch');
    if (project.value!.amountOfAccs <= 1) return
    project.value!.amountOfAccs = project.value!.amountOfAccs - 1;
    emit('dragSwitch');
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');


  .tag-bg {
    border-top-left-radius: 30%;
  }
  .font {
    font-family: Inter,Helvetica Rounded,Helvetica,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    font-size: 16px;
    font-weight: 400;
  }

  .apple-font {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
  }
  .part {
    font-family: Inter,Helvetica Rounded,Helvetica,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    font-size: 12px;
  }
  .amount {
    font-family: Inter,Helvetica Rounded,Helvetica,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    font-size: 14px;
  }
  .items-color {
    background: rgb(30, 31, 36);
  }
  </style>