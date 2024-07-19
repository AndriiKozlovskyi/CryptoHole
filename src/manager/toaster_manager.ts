import type { ToastServiceMethods } from 'primevue/toastservice'

export default class ToastManager {
  static showSuccessToast(toast: ToastServiceMethods, message: string) {
    toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 })
  }

  static showErrorToast(toast: ToastServiceMethods, message: string) {
    toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 })
  }

  static showInfoToast(toast: ToastServiceMethods, message: string) {
    toast.add({ severity: 'info', summary: 'Info', detail: message, life: 3000 })
  }
}
