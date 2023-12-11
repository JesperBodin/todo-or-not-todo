<template>
  <div class="btn-group-lg mb-3">
    <button @click="confirmationPopup" class="btn btn-primary btn-danger me-2">
      {{ $t("removeAll") }}
    </button>
    <button @click="sort" class="btn btn-primary me-2">{{ $t("sort") }}</button>
    <button @click="hideDone = !hideDone" class="btn btn-primary me-2">
      {{ $t(hideDone ? "showDone" : "hideDone") }}
    </button>
    <button class="btn btn-primary me-2" @click="toggleLocale">
      {{ $t("language") }}
    </button>
  </div>
  <ConfirmationModal :visible="confirmationVisible" @confirm="removeAll" @cancel="cancelRemoveAll"
    :title="$t('removeAllModalTitle')" :cancelButtonLabel="$t('cancelLabel')" :confirmButtonLabel="$t('confirmLabel')">
    <p>{{ $t("removeAllModalText") }}</p>
  </ConfirmationModal>
</template>
   
<script>
import { todoStore } from "../stores/TodoStore";
import { mapWritableState, mapActions } from "pinia";
import ConfirmationModal from "./shared/ConfirmationModal.vue";

export default {
  data() {
    return {
      confirmationVisible: false,
    }
  },

  components: {
    ConfirmationModal
  },

  computed: {
    ...mapWritableState(todoStore, [
      "newTodo",
      "todos",
      "hideDone",
      "dueDate",
    ]),

    activeTodos() {
      return this.todos.filter((todo) => !todo.done);
    },
    completedTodos() {
      return this.todos.filter((todo) => todo.done);
    },
  },

  methods: {
    ...mapActions(todoStore, [
      "removeAllTodos",
      "sortByDate",
    ]),

    confirmationPopup() {
      this.confirmationVisible = true;
    },

    removeAll() {
      this.removeAllTodos();
      this.confirmationVisible = false;
    },

    cancelRemoveAll() {
      this.confirmationVisible = false;
    },

    sort() {
      this.sortByDate();
    },

    toggleLocale() {
      this.currentLocale = this.currentLocale === "en" ? "sv" : "en";
      this.$i18n.locale = this.currentLocale;
    },

  },
};
</script>
   
<style scoped></style>
   