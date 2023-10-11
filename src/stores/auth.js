import { signInWithEmailAndPassword } from 'firebase/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import { errorCodes } from '../constants'

export const useAuthStore = defineStore('auth', () => {

  const auth = useFirebaseAuth()
  const errorMsg = ref(null)
  const user = ref(null)

  const login = async ({email, password}) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        console.log(credentials)
        user.value = credentials.user
        console.log(user.value)
      })
      .catch(error => {
        console.log(error)
        errorMsg.value = errorCodes[error.code]
        console.log(errorMsg.value)
      })
  }

  const hasError = computed(() => {
    return errorMsg.value
  })

  return {
    login,
    errorMsg,
    user,
    hasError
  }
})
