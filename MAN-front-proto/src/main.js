/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Import i18n configuration
import i18n from "./i18n";

// Plugins
import { registerPlugins } from "@/plugins";

// Import Vuex store
import store from "./store"; // Add this line

const app = createApp(App);

registerPlugins(app);

app.use(i18n);

// Use Vuex store
app.use(store); // Add this line

app.mount("#app");
