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

    type: "Type",
    mainGroup: "Main Group",
    gattung: "Gattung",
    export: "Export",
    close: "Close",
    choose: "Choose",
    search: "Search",
    noData: "No data available",
    selectOption: "Select option",
    subProducts: {
      camera: "Camera",
      rearTargetDisplay: "528M (Rear Target Display)",
      specialUseArea1: "Special use area opposite door 2",
      specialUseArea2: "Special use area right before door 2",
      seating: "Seating",
      handrails: "Handrails",
    },
  },
  de: {
    title: "WÄHLEN SIE IHR FAHRZEUG",
    back: "Zurück",
    fuel: "Kraftstoff",
    length: "Länge",
    seats: "Sitze",
    features: "Eigenschaften",

    type: "Typ",
    mainGroup: "Hauptgruppe",
    gattung: "Gattung",
    export: "Exportieren",
    close: "Schließen",
    choose: "Wählen",
    search: "Suche",
    noData: "Keine Daten verfügbar",
    selectOption: "Option auswählen",
    subProducts: {
      camera: "Kamera",
      rearTargetDisplay: "528M (Heckzielanzeige)",
      specialUseArea1: "Sondernutzungsfläche gegenüber Tür 2",
      specialUseArea2: "Sondernutzungsfläche rechts vor Tür 2",
      seating: "Bestuhlung",
      handrails: "Haltestangen",
    },
  },
};

const i18n = createI18n({
  locale: "de", // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
});

export default i18n;
