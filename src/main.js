import './assets/main.css'

import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

import { VueFire, VueFireAuth } from 'vuefire'
import App from './App.vue'
import { db } from './db/db'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives
})

app.use(VueFire, {
  firebaseApp: db,
  modules: [VueFireAuth()]
})

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
