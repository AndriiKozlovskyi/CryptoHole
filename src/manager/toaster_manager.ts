import type { ToastServiceMethods } from 'primevue/toastservice';

export default class ToastManager {

    static showSuccessToast(toast: ToastServiceMethods, message: string) {
        toast.add({ severity: 'success', summary: 'success', detail: message, life: 3000 });
    }

    static showErrorToast(toast: ToastServiceMethods, message: string) {
        toast.add({ severity: 'error', summary: 'error', detail: message, life: 3000 });
    }

    static showInfoToast(toast: ToastServiceMethods, message: string) {
        toast.add({ severity: 'info', summary: 'info', detail: message, life: 3000 });
    }
}