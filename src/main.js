import { createApp } from 'vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'
import './styles/global.css'
import './styles/motion.css'
import { vReveal } from './composables/useReveal'

createApp(App).directive('reveal', vReveal).mount('#app')
