<template>
  <div class="flex flex-col gap-y-1 h-full w-full justify-center items-center">
    <div class="flex flex-col gap-3 border-[1px] items-center border-hover-primary-item-color px-10 py-10 rounded-lg">
            <MyInput v-model="username" placeholder="Username"/>
            <MyInput v-model="password" placeholder="Password"/>
            <MyButton class="mt-2 w-1/2" text="Login" @onClick="tryLogin">Login</MyButton> 
            <span class="text-[12px] text-center text-white cursor-pointer">
                Don't have an account?
                <a href="/auth/register" class="underline"> Register </a>
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import MyInput from "@/components/basic_components/MyInput.vue";
import AuthManager from "@/manager/auth_manager";
import MyButton from "@/components/basic_components/MyButton.vue";
import { ref } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter();

const username = ref("");
const password = ref("");

const tryLogin = async () => {
  await AuthManager.login(username.value, password.value)

  router.push('/')
}
</script>