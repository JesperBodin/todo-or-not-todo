import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "sv", // default locale
  messages: {
    en: {
      todo: "Active Todos",
      add: "Add",
      removeAll: "Remove All",
      sort: "Sort",
      hideDone: "Hide done",
      showDone: "Show done",
      done: "Done Todos",
      deadline: "Deadline:",
      language: "Svenska",
      dueDate: "Deadline",
      todoText: "Task",
      actions: "Actions",
      edit: "edit",
      remove: "remove",
      activeTable: "Active Todos",
      completedTable: "Completed Todos",
    },
    sv: {
      todo: "Aktiva Todos",
      add: "Lägg till",
      removeAll: "Ta bort alla",
      sort: "Sortera",
      hideDone: "Dölj klara",
      showDone: "Visa klara",
      done: "Avslutade Todos",
      deadline: "Deadline:",
      language: "English",
      dueDate: "Slut Datum",
      todoText: "Uppgift",
      actions: "Actions",
      edit: "ändra",
      remove: "ta bort",
      activeTable: "Aktiva Uppgifter",
      completedTable: "Avklarade Uppgifter",
    },
  },
});

export default i18n;
