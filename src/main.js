import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import './theme.css'

const app = createApp(App)
app.component('app-loader', defineAsyncComponent(() => {
  return import('./AppLoader')
}))
app.mount('#app')