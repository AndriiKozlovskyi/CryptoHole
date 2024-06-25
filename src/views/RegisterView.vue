<template>
    <div class="flex flex-col gap-y-1 h-full w-full justify-center items-center">
        <div class="flex flex-col gap-3 border-[1px] items-center border-hover-primary-item-color px-10 py-10 rounded-lg">
            <MyInput v-model="credentials.username" placeholder="Username"/>
            <MyInput v-model="credentials.email" placeholder="Email"/>
            <MyInput v-model="credentials.password" placeholder="Password"/>
            <i
              :class="`inset-y-0 self-center text-gray-400 right-2 ${isPasswordVisible ? 'pi pi-eye' : 'pi pi-eye-slash'}`" 
              @click="togglePasswordVisibility"
            ></i>
            <MyInput v-model="credentials.repeatedPassword" placeholder="Retype Password"/>
            <MyButton class="w-1/3" text="Register" @onClick="tryRegister"></MyButton> 
            <span class="text-[12px] text-center text-white cursor-pointer">
                Already have an account?
                <a href="/auth/login" class="underline"> Login </a>
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import MyInput from "@/components/basic_components/MyInput.vue";
import AuthManager from "@/manager/auth_manager";
import MyButton from "@/components/basic_components/MyButton.vue";
import { reactive, ref } from "vue";

const credentials = reactive({
  username: '',
  email: '',
  password: '',
  repeatedPassword: ''
});

const isPasswordVisible = ref(true);

const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
}

const tryRegister = async () => {
  if (!credentials.password || credentials.password !== credentials.repeatedPassword) {
    throw new Error("Passwords aren't equal")
  }

  await AuthManager.register(credentials.username, credentials.email, credentials.password)
}
</script>