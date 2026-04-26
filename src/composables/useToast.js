import { ref } from 'vue'

const toastState = ref({
  visible: false,
  type: 'info',
  title: '',
  message: '',
})

let dismissTimer = null

export function useToast() {
  function showToast({ type = 'info', title = '', message = '', duration = 2800 }) {
    toastState.value = {
      visible: true,
      type,
      title,
      message,
    }

    if (dismissTimer) clearTimeout(dismissTimer)
    dismissTimer = setTimeout(() => {
      toastState.value.visible = false
    }, duration)
  }

  function hideToast() {
    toastState.value.visible = false
  }

  return {
    toastState,
    showToast,
    hideToast,
  }
}
