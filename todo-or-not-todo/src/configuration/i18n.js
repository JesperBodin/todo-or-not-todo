import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "sv", // default locale
  messages: {
    en: {
      todo: "Todo",
      add: "Add",
      removeAll: "Remove All",
      sort: "Sort",
      hideDone: "Hide done",
      showDone: "Show done",
      done: "Or not todo..",
      deadline: "Deadline:",
      language: "Svenska",
    },
    sv: {
      todo: "Att göra",
      add: "Lägg till",
      removeAll: "Ta bort alla",
      sort: "Sortera",
      hideDone: "Dölj klara",
      showDone: "Visa klara",
      done: "Eller att inte göra..",
      deadline: "Slut datum:",
      language: "English",
    },
  },
});

export default i18n;
