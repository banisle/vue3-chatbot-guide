//@ts-nocheck
import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import { createPinia } from 'pinia'
// import DropZone from 'dropzone-vue';
import 'dropzone-vue/dist/dropzone-vue.common.css';
import VSwatches from 'vue3-swatches'
import VCalendar from 'v-calendar';


import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css';
import '@/assets/style/style.scss'
import 'vue3-swatches/dist/style.css'
import 'v-calendar/style.css';

const pinia = createPinia()


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(vuetify)
  .use(router)
  .use(pinia)
  .use(VSwatches)
  .use(VCalendar, {})
  .mount('#app')

// createApp(App).mount('#app')
