<template>
    <div class="fixed w-full flex z-[1000] flex-row justify-between bg-[#101114] text-gray-400 font-semibold items-center">
        <div class="flex flex-row space-x-6 w-1/3">
            <p class="text-center text-lg px-3 py-4">CryptoArchive.com</p>
            <p class="text-white hover:bg-[#28292e] cursor-pointer rounded-xl px-3 py-4">News</p>
            <p class="text-white hover:bg-[#28292e] cursor-pointer rounded-xl px-3 py-4">Guides</p>
        </div>
        

        <div class="w-1/3 flex flex-row justify-center">
            <SearchBar class="w-1/2"/>
        </div>
        <div class="flex flex-row items-end justify-end text-normal font-medium text-white w-1/3">
         
            <span 
                class="flex flex-col rounded-full cursor-pointer justify-center items-center px-2 py-2 hover:bg-[#211f1f]"
                @click="toggleMenu()"
            >
                <img class="circle-image1" src="https://masterpiecer-images.s3.yandex.net/ae360eac8a1c11ee951b7a2f0d1382ba:upscaled"/>
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import SearchBar from "./SearchBar.vue"
import ProfileMenu from "./ProfileMenu.vue";
import { ref } from "vue";

const showMenu = ref(false);

const toggleMenu = () => {
    showMenu.value = !showMenu.value;
}

</script>
<style>
 .circle-image1 {
    width: 60px;  /* Adjust the width and height as needed */
    height: 60px; /* Ensure width and height are equal for a perfect circle */
    border-radius: 50%;
    object-fit: cover; /* Ensure the image covers the entire area */
  }
  .bg {
    background-color: rgb(16, 17, 20);
  }
  </style>