<template>
    <div class="fixed flex flex-col p-3 shadow-xl space-y-3 w-[24rem] justify-between rounded-lg bg-hover-primary-item-color h-[15rem]"
    @keypress.enter="save">
      <div class="flex flex-row rounded-md">
        <MyInput v-model="name" placeholder="event name"/>
      </div>
      <div class="flex flex-row justify-between text-secondary-text-color">
        <div class="flex flex-col items-center space-y-2">
            <MyButton 
                :class="{ [`inner-shadow`]: startSelecting }"
                text="select start date"
                @onClick="startSelecting = true; endSelecting = false;"/>
            <p>{{ startDate?.toLocaleDateString() }}</p>
            <div class="flex flex-row items-center">
                <TimePicker :hour="hour" :minute="minute" @update:hour="updateHour" @update:minute="updateMinute" />
            </div>
        </div>

        <div class="flex flex-col items-center space-y-2">
            <MyButton 
                :class="{ [`inner-shadow`]: endSelecting }"
                text="select end date"  
                @onClick="endSelecting = true; startSelecting = false;"/>
            <p>{{ endDate?.toLocaleDateString() }}</p>

            <div class="flex flex-row items-center">
                <TimePicker :hour="hour" :minute="minute" @update:hour="updateHour" @update:minute="updateMinute" />
            </div>
        </div>
      </div>
      <!-- <div class="flex flex-row justify-between">
        <MyButton text="Disacrd"/>
        <MyButton text="Save"/>
      </div> -->
    </div>
</template>
<script setup lang="ts">
import {ref, watch} from "vue";
import MyInput from "@/components/basic_components/input/MyInput.vue";
import TimePicker from "@/components/basic_components/TimePicker.vue";
import SavedEventManager from "@/manager/saved_event_manager";
import MyButton from "../basic_components/MyButton.vue";

const props = defineProps({
    date: Date,
});

const hour = ref(12);
const minute = ref(0);

const startDate = ref();
const endDate = ref();

const startSelecting = ref(false);
const endSelecting = ref(false);

watch(() => props.date, (newDate) => {
    if(startSelecting.value) {
        startDate.value = newDate;
    }
    if(endSelecting.value) {
        endDate.value = newDate;
    }
    console.log("Ok");
});

const updateHour = (newHour: number) => {
  hour.value = newHour;
};

const updateMinute = (newMinute: number) => {
  minute.value = newMinute;
};

const name = ref();

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  // Get timezone offset in hours and minutes
  const offset = -date.getTimezoneOffset();
  const offsetSign = offset >= 0 ? '+' : '-';
  const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
  const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0');
  
  const timezone = `${offsetSign}${offsetHours}:${offsetMinutes}`;

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}`;
}

const save = () => {
    console.log(new Date(props.date.getFullYear(), props.date.getMonth(), props.date.getDate(), hour.value, minute.value, 0))
    SavedEventManager.createSavedEvent({
        name: name.value,
        startDate: formatDate(new Date(props.date.getFullYear(), props.date.getMonth(), props.date.getDate(), hour.value, minute.value, 0)),
        status: "todo",
        orderNumber: 1,
        endDate: ""
    })
}

</script>
<style>
.inner-shadow {
    /* box-shadow: rgb(16, 15, 24) 0px 0px 10px 5px inset; */
    box-shadow: rgb(16, 15, 24) 0px 3px 3px 0px inset;
}
</style>