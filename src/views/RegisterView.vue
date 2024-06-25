<template>
    <Toast/>
  <div class="flex flex-col gap-y-1 h-full w-full justify-center items-center">
    <div
      class="flex flex-col gap-3 border-[1px] w-[22rem] items-center border-hover-primary-item-color px-10 py-10 rounded-lg"
    >
      <MyInput v-model="credentials.username" placeholder="Username" />
      <MyInput v-model="credentials.email" placeholder="Email" />

      <PasswordInput placeholder="Password" v-model="credentials.password"/>
      <PasswordInput placeholder="Repeat password" v-model="credentials.repeatedPassword"/>

      <MyButton class="w-1/3" text="Register" @onClick="tryRegister"/>

      <span class="text-[12px] text-center text-white cursor-pointer">
        Already have an account?
        <a href="/auth/login" class="underline"> Login </a>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import MyInput from '@/components/basic_components/input/MyInput.vue'
import AuthManager from '@/manager/auth_manager'
import MyButton from '@/components/basic_components/MyButton.vue'
import { reactive } from 'vue'
import PasswordInput from "@/components/basic_components/input/PasswordInput.vue";
import ToastManager from '@/manager/toaster_manager';
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const credentials = reactive({
  username: '',
  email: '',
  password: '',
  repeatedPassword: ''
})

const tryRegister = async () => {
  if (!credentials.password || credentials.password !== credentials.repeatedPassword) {
    throw new Error("Passwords aren't equal")
  }

  const response = await AuthManager.register(credentials.username, credentials.email, credentials.password);
  console.log(response.status + " uibiopuubiop" )
  ToastManager.showSuccessToast(toast, "You have successfuly created an account!");

}
</script>
