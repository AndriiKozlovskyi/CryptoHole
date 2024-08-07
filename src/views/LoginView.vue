<template>
  <div
    class="flex flex-col gap-y-1 h-full w-full justify-center items-center"
    @keydown.enter="tryLogin"
  >
    <div
      class="flex flex-col gap-y-3 border-[1px] w-[22rem] items-center border-hover-primary-item-color px-10 py-10 rounded-lg"
    >
      <div class="flex flex-col h-[2.5rem] justify-end">
        <p v-if="identifierEmpty" class="text-red-500 text-[12px] apple-font px-3">
          * Username cannot be empty
        </p>
        <RoundedInput
          v-model="credentials.identifier"
          placeholder="Username or email"
          @focusin="identifierEmpty = false"
        />
      </div>
      <div class="flex flex-col h-[2.5rem] justify-end">
        <p v-if="passwordEmpty" class="text-red-500 text-[12px] apple-font px-3">
          * Password cannot be empty
        </p>
        <PasswordInput
          placeholder="Password"
          v-model="credentials.password"
          @focusin="passwordEmpty = false"
        />
      </div>
      <div class="flex items-center w-full">
        <input type="checkbox" id="rememberMe" v-model="rememberMe" class="mr-2" />
        <label for="rememberMe" class="text-secondary-text-color apple-font">Remember Me</label>
      </div>
      <MyButton class="w-full" text="Login" @onClick="tryLogin">Login</MyButton>
      <span class="text-[12px] text-center text-white cursor-pointer">
        Don't have an account?
        <a href="/auth/register" class="underline"> Register </a>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import RoundedInput from '@/components/basic_components/input/RoundedInput.vue'
import AuthManager from '@/manager/auth_manager'
import MyButton from '@/components/basic_components/MyButton.vue'
import PasswordInput from '@/components/basic_components/input/PasswordInput.vue'
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ToastManager from '@/manager/toaster_manager'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const router = useRouter()

const credentials = reactive({
  identifier: '',
  password: ''
})
const identifierEmpty = ref(false)
const passwordEmpty = ref(false)
const rememberMe = ref(false)

const tryLogin = async () => {
  if (credentials.identifier === '') {
    identifierEmpty.value = true
  }
  if (credentials.password === '') {
    passwordEmpty.value = true
  }
  if (credentials.identifier === '' || credentials.password === '') {
    return
  }
  if (rememberMe.value) {
    localStorage.setItem('credentials', JSON.stringify(credentials))
  } else {
    localStorage.removeItem('credentials')
  }
  await AuthManager.login(credentials.identifier, credentials.password)
  ToastManager.showSuccessToast(toast, 'You have logged in!')
  router.push('/home/events')
}

onMounted(() => {
  const savedCredentials = localStorage.getItem('credentials')
  if (savedCredentials) {
    const parsedCredentials = JSON.parse(savedCredentials)
    credentials.identifier = parsedCredentials.identifier
    credentials.password = parsedCredentials.password
    rememberMe.value = true
  }
})
</script>
