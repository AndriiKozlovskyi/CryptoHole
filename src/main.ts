import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import store from './store/store'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import ConfirmationService from 'primevue/confirmationservice';
import {VInput} from 'vue-dynamic-input-component' 
import 'vue-dynamic-input-component/dist/style.css';

const app = createApp(App)

app.use(ConfirmationService);
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(VInput)
app.use(store)
app.component('Toast', Toast)
app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
