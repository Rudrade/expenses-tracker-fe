import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import PrimeVue from "primevue/config"
import Aura from '@primeuix/themes/aura';

createApp(App)
    .use(router)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: ''
            }
        }
    })
    .mount('#app')
