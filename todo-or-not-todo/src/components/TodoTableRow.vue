<template>
    <tr :class="{ editing: editing }">
      <td>
        <div v-if="!editing" class="todo-cell due-date">
          <h5 class="mb-0">{{ $t("deadline") }} {{ todo.dueDate }}</h5>
        </div>
        <div v-if="editing" class="todo-date">
          <input type="date" v-model="editedDate" @keydown.enter="saveEditedTodo" class="form-control" />
        </div>
      </td>
      <td>
        <div v-if="!editing">
          <h5 class="todo-text" style="cursor: pointer;" :class="{ done: todo.done }" @click="toggleDone(todo.id)">
            {{ todo.newTodo }}
          </h5>
        </div>
        <div v-if="editing" class="todo-text">
          <input v-model="editedText" @keydown.enter="saveEditedTodo" class="form-control" />
        </div>
      </td>
      <td class="text-center">
        <button @click="editTodo" class="editBtn btn btn-warning"><i class="bi bi-pencil-fill"></i></button>
      </td>
      <td class="text-center">
        <button @click="confirmationPopup" class="removeBtn btn btn-danger"><i class="bi bi-trash3"></i></button>
      </td>
    </tr>
    <ConfirmationModal
        :visible="confirmationVisible"
        @confirm="removeTodo"
        @cancel="cancelRemoveTodo"
        :title="$t('removeModalTitle')"
        :cancelButtonLabel="$t('cancelLabel')"
        :confirmButtonLabel="$t('confirmLabel')"
      >
        <p>{{ $t("removeModalText") }}</p>
      </ConfirmationModal>
  </template>
  
  <script>

  import ConfirmationModal from './shared/ConfirmationModal.vue';
  
  export default {
  
    data() {
      return {
        editing: false,
        editedText: this.todo.newTodo,
        editedDate: this.todo.dueDate,
        editedDone: this.todo.done,
        confirmationVisible: false,
      };
    },

    components: {
      ConfirmationModal
},

    emits: ["remove", "toggleDone", "edit-todo", "save-edited-todo"],
  
    props: {
      todo: {
        type: Object,
        required: true,
      },
    },
  
    methods: {
  
      removeTodo() {
        this.$emit("remove", this.todo);
        this.confirmationVisible = false
      },
  
      toggleDone() {
        this.$emit("toggleDone", this.todo.id);
      },
  
      editTodo() {
        this.$emit("edit-todo", this.todo);
        this.editing = true;
        this.editDate = true;
      },
  
      saveEditedTodo() {
        this.$emit("save-edited-todo", {
          id: this.todo.id,
          newTodo: this.editedText,
          dueDate: this.editedDate,
          done: this.editedDone,
        });
        this.editing = false;
      },

      confirmationPopup() {
        this.confirmationVisible = true;
      },

      cancelRemoveTodo() {
        this.confirmationVisible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  