<template>
    <div class="flex flex-col gap-y-3 h-full w-full justify-center items-center">
        <div class="flex flex-col gap-6">
            <MyInput v-model="username" placeholder="Username"/>
            <MyInput v-model="password" placeholder="Password"/>
            <MyButton text="Login" @onClick="tryLogin">Login</MyButton> 
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