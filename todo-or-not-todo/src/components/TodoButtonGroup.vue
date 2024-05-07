<template>
  <div class="button-group">
    <button @click="confirmationPopup" class="button remove-button">
      {{ $t("removeAll") }}
    </button>
    <button @click="sort" class="button">{{ $t("sort") }}</button>
    <button @click="hideDone = !hideDone" class="button">
      {{ $t(hideDone ? "showDone" : "hideDone") }}
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
  },
};
</script>
   
<style scoped>

.button-group {

}

.button {
  padding: 0 10px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  color: #333;
  cursor: pointer;
  margin-right: 5px;
}

.button:hover {
  background-color: #e6e6e6;
}

.remove-button {
  border: 1px solid #ff4d1a;
  background-color: #ff4d4d;
  color: #333;
}

.remove-button:hover {
  background-color: #ff3333;
}

</style>
   