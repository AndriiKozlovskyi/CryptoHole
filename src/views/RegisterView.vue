<template>
  <div class="flex flex-col gap-y-1 h-full w-full justify-center items-center">
    <div
      class="flex flex-col gap-y-3 border-[1px] w-[22rem] items-center border-hover-primary-item-color px-10 py-10 rounded-lg"
    >
			<div class="flex flex-col h-[2.5rem] justify-end">
				<p v-if="usernameExists" class="text-red-500 text-[12px] apple-font px-3">* Username already exists</p>
				<p v-if="usernameEmpty" class="text-red-500 text-[12px] apple-font px-3">* Username cannot be empty</p>
				<MyInput v-model="credentials.username" placeholder="Username" @focusout="usernameValidate" @focusin="usernameExists = false; usernameEmpty = false"/>
			</div>
			<div class="flex flex-col h-[2.5rem] justify-end">
				<p v-if="emailExists" class="text-red-500 text-[12px] apple-font px-3">* Email already exists</p>
				<p v-if="emailEmpty" class="text-red-500 text-[12px] apple-font px-3">* Email cannot be empty</p>
				<MyInput v-model="credentials.email" placeholder="Email"@focusout="emailValidate" @focusin="emailExists = false; emailEmpty = false;">
					<i class="pi pi-exclamation-circle text-red-600 px-3" v-if="!emailValid"/>
				</MyInput>
			</div>
			<div class="flex flex-col h-[2.5rem] justify-end">
				<p v-if="passwordEmpty" class="text-red-500 text-[12px] apple-font px-3">* Password cannot be empty</p>
				<p v-else-if="!passwordValid" class="text-red-500 text-[12px] apple-font px-3">* min 8 characters</p>
				<PasswordInput v-model="credentials.password" placeholder="Password" @focusin="passwordEmpty = false; passwordValid = true;"/>
			</div>
			<div class="flex flex-col h-[2.5rem] justify-end">
				<p v-if="repeatedPasswordEmpty" class="text-red-500 text-[12px] apple-font px-3">* Confirm password cannot be empty</p>
				<p v-else-if="!passwordsMatch" class="text-red-500 text-[12px] apple-font px-3">* Passwords don't match</p>
				<PasswordInput placeholder="Repeat password" v-model="credentials.repeatedPassword" @focusin="repeatedPasswordEmpty = false; passwordsMatch = true;"/>
			</div>
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
import { computed, reactive, ref } from 'vue'
import PasswordInput from "@/components/basic_components/input/PasswordInput.vue";
import ToastManager from '@/manager/toaster_manager';
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()

const credentials = reactive({
  username: '',
  email: '',
  password: '',
  repeatedPassword: ''
});

const validationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

const usernameExists = ref(false);
const emailExists = ref(false);
const emailEmpty = ref(false);
const usernameEmpty = ref(false);
const passwordEmpty = ref(false);
const repeatedPasswordEmpty = ref(false);
const passwordsMatch = ref(true);
const passwordValid = ref(true);

const validatePassword = () => {
	if(credentials.password.length < 8) {
		return false;
	}

	return true;
};

const emailValid = computed(() => {
    if(credentials.email === '') {
        return true;
    }
    if (validationRegex.test(credentials.email)) {
        return true;
    } 
    return false
});

const usernameValidate = async () => {
	if(credentials.username === '') {
		return;
	}
	const exists = await AuthManager.usernameExists(credentials.username);
	usernameExists.value = <boolean>exists.data;
}


const emailValidate = async () => {
	if(credentials.email === '') {
		return;
	}
	const exists = await AuthManager.emailExists(credentials.email);
	emailExists.value = <boolean>exists.data;
}

const tryRegister = async () => {
	if(credentials.email === '') {
		emailEmpty.value = true;
	}
	if(validatePassword() === false) {
		passwordValid.value = false;
	}
	if(credentials.username === '') {
		usernameEmpty.value = true;
	}
	if(credentials.password === '') {
		passwordEmpty.value = true;
	}
	if(credentials.repeatedPassword === '') {
		repeatedPasswordEmpty.value = true;
	}
  if (credentials.password !== credentials.repeatedPassword) {
		passwordsMatch.value = false;
  }

	if(usernameEmpty.value || emailEmpty.value || passwordEmpty.value || repeatedPasswordEmpty.value || !passwordsMatch.value || emailValid.value === false || !passwordValid.value) {
		return;
	}

  await AuthManager.register(credentials.username, credentials.email, credentials.password);
  ToastManager.showSuccessToast(toast, "You have successfuly created an account!");
	router.push('/auth/login');

}
</script>
