<template>
  <div class="flex flex-col gap-y-1 h-full w-full justify-center items-center">
    <div
      class="flex flex-col gap-3 border-[1px] items-center border-hover-primary-item-color px-10 py-10 rounded-lg"
    >
      <MyInput v-model="credentials.identifier" placeholder="Username or email" />
      <PasswordInput placeholder="Password" v-model="credentials.password"/>
      <MyButton class="mt-2 w-1/2" text="Login" @onClick="tryLogin">Login</MyButton>
      <span class="text-[12px] text-center text-white cursor-pointer">
        Don't have an account?
        <a href="/auth/register" class="underline"> Register </a>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import MyInput from '@/components/basic_components/input/MyInput.vue'
import AuthManager from '@/manager/auth_manager'
import MyButton from '@/components/basic_components/MyButton.vue'
import PasswordInput from "@/components/basic_components/input/PasswordInput.vue";
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const credentials = reactive({
  identifier: '',
  password: ''
})

const tryLogin = async () => {
  await AuthManager.login(credentials.identifier, credentials.password)

  router.push('/')
}
</script>
