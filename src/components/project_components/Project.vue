<template>
    <Toast/>
    <div class="relative flex bg-primary-item-color hover:bg-hover-primary-item-color h-portrait-card group overflow-hidden w-full basis-full flex-col rounded-lg tracking-tight cursor-pointer transition-[transform] active:scale-[0.99] group"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"  
        @click="goToProjectDescritpion"      
    >
        <!--image-->
        <div class="h-full grow">
            <img class="h-full w-full rounded-t-xl object-cover opacity-[0.85] transition-all group-hover:scale-[1.02] group-hover:opacity-95" :src="project?.src"/>
        </div>
        <!--save mark-->
        <div class="absolute flex flex-row mt-5 px-5 justify-end w-full h-full">
            <i v-if="saved && hovered" class="pi pi-bookmark-fill text-white" style="font-size: 1.5rem;" @click.stop="unsave()"></i>
            <i v-if="!saved && hovered" class="pi pi-bookmark  text-white" style="font-size: 1.5rem;" @click.stop="save()"></i>
        </div>
        <!--tag-->
        <div class="absolute rounded-full mt-5 ml-5 px-3 py-1 bg-slate-600 bg-opacity-50 text-white hover:bg-opacity-100">
            #{{ project?.tag }}
        </div>
        <!--lowwer bar-->
        <div class="flex grow flex-col gap-5 mt-2 items-start px-5">
            <!--name-->
            <div class="text-white text-[20px] font-normal">
                {{ project?.name }}
            </div>
            <!--horizontal line-->
            <hr class="w-full border-gray-700">
            <!--lowwer bar-->
            <div class="flex flex-row justify-between w-full rounded-full text-sm text-white">
                <!--participants bar-->
                <div class="flex flex-row mb-5 space-x-3 items-center">
                    <img class="rounded-full" width="28px" height="28px" src="https://masterpiecer-images.s3.yandex.net/65782260a05d11eebe3ad20dae950626:upscaled"/>
                    <div class="flex flex-col">
                        <p class="amount font-semibold text-white">
                            {{project?.participants}}K
                        </p>
                        <p class="part text-[#848486]">
                            Participants
                        </p>
                    </div>
                </div>
                <!--expenses-->
                <div class="flex flex-row space-x-1 mb-5 items-center">
                    <p class="font-semibold text-[14px] text-gray-300">
                        {{ project?.expenses }}
                    </p>
                    <img width="16px" height="16px" src="https://cryptologos.cc/logos/tether-usdt-logo.png"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import LocalStorageManager from '@/manager/local_storage_manager';
import { onBeforeMount, ref } from 'vue';
import type {Project} from "@/entity/Project";
import type { PropType } from 'vue';
import { useRouter } from 'vue-router'
import ToastManager from "@/manager/toaster_manager";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const router = useRouter();

const props = defineProps({
  project: Object as PropType<Project>,
});
const saved = ref(false);
const hovered = ref(false);

onBeforeMount(() => {
    saved.value = LocalStorageManager.isProjectSaved(props.project!);
})

const save = () => {
    if (props.project !== undefined)
        LocalStorageManager.saveProject(props.project)
    saved.value = true;
    ToastManager.showSuccessToast(toast, "You've been successfully saved a project")
};

const unsave = () => {
    if (props.project !== undefined)
        LocalStorageManager.unsaveProject(props.project)
    saved.value = false;
    ToastManager.showSuccessToast(toast, "You've been successfully unsaved a project")
};

const goToProjectDescritpion = () => {
    router.push({ name: 'project_description', params: { name: props.project?.name } });

}

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');


  .tag-bg {
    border-top-left-radius: 30%;
  }
  .font {
    font-family: Inter,Helvetica Rounded,Helvetica,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    font-size: 20px;
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