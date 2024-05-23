// src/i18n.js
import { createI18n } from "vue-i18n";

const messages = {
  en: {
    title: "CHOOSE YOUR VEHICLE",
    back: "Back",
    fuel: "Fuel",
    length: "Length",
    seats: "Seats",
    features: "Features",
  },
  de: {
    title: "WÄHLEN SIE IHR FAHRZEUG",
    back: "Zurück",
    fuel: "Kraftstoff",
    length: "Länge",
    seats: "Sitze",
    features: "Eigenschaften",
  },
};

const i18n = createI18n({
  locale: "de", // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
});

export default i18n;
