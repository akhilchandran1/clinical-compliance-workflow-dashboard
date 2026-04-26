import { validateDocument, validateRejectionComment } from '../utils/validators'

export function useValidation() {
  return {
    validateDocument,
    validateRejectionComment,
  }
}
