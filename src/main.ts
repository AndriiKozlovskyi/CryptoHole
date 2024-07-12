import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import store from './store/store'
import ConfirmationService from 'primevue/confirmationservice';

const app = createApp(App)

app.use(ConfirmationService);
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(store)
app.component('Toast', Toast)

app.mount('#app')
