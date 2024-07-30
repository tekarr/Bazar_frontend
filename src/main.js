import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import store from "@/store";
import { createI18n } from 'vue-i18n';
// Import localization files
import en from './locales/en.json';
import ar from './locales/ar.json';


// Set up VueI18n
const i18n = createI18n({
    legacy: false, // Ensure to use the Composition API mode
    locale: 'en', // Set the default locale
    fallbackLocale: 'en', // Set the fallback locale in case the current locale can't be found
    messages: {
        en,
        ar,
    },
});

const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(store)
app.mount('#app')

