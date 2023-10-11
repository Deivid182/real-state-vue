import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { defineStore } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'
import { errorCodes } from '../constants'

export const useAuthStore = defineStore('auth', () => {

  const auth = useFirebaseAuth()
  const router = useRouter()
  const errorMsg = ref(null)
  const authUser = ref(null)

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user
        console.log(authUser.value)
        router.push('/')
      }
    })
  })

  const login = async ({email, password}) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        authUser.value = credentials.user
      })
      .catch(error => {
        console.log(error)
        errorMsg.value = errorCodes[error.code]
        console.log(errorMsg.value)
      })
  }

  const logOut = () => {
    signOut(auth)
      .then(() => {
        authUser.value = null
        router.push({ name: 'login' })
      })
      .catch(error => {
        console.log(error)
        errorMsg.value = 'Something went wrong'
      })
  }

  const hasError = computed(() => {
    return errorMsg.value
  })

  const isAuth = computed(() => {
    return authUser.value
  })

  return {
    login,
    errorMsg,
    authUser,
    hasError,
    isAuth,
    logOut
  }
})
