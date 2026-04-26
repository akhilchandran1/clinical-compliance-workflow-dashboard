import { computed } from 'vue'
import { formatDate, formatDateTime } from '../utils/dateUtils'

export function useDateFormat(input) {
  return {
    formattedDate: computed(() => formatDate(input?.value ?? input)),
    formattedDateTime: computed(() => formatDateTime(input?.value ?? input)),
  }
}
