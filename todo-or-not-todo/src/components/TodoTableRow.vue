<template>
    <tr :class="{ editing: editing }">
      <td>
        <div v-if="!editing" class="todo-cell">
          <h5 class="">{{ $t("deadline") }} {{ todo.dueDate }}</h5>
        </div>
        <div v-if="editing" class="todo-date">
          <input type="date" v-model="editedDate" @keydown.enter="saveEditedTodo" class="" />
        </div>
      </td>
      <td>
        <div v-if="!editing">
          <h5 class="todo-text" style="cursor: pointer;" :class="{ done: todo.done }" @click="toggleDone(todo.id)">
            {{ todo.newTodo }}
          </h5>
        </div>
        <div v-if="editing" class="todo-text">
          <input v-model="editedText" @keydown.enter="saveEditedTodo" class="" />
        </div>
      </td>
      <td class="td-button">
        <button @click="editTodo" class=""><font-awesome-icon icon="pen-to-square" /></button>
      </td>
      <td class="td-button">
        <button @click="confirmationPopup" class=""><font-awesome-icon icon="trash-can" /></button>
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

  .todo-cell, .todo-text {
    text-align: left;
  }

  td {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: white;
}

  .td-button {
    text-align: center;
  }

  .editing {
    background-color: #f0f0f0;
  }

  input[type="date"],
  input[type="text"] {
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px;
    width: 100%;
    box-sizing: border-box;
  }

  button {
    border: none;
    background-color: #f5f5f5;
    cursor: pointer;
    padding: 5px 10px;
  }

  button:hover {
    background-color: #e6e6e6;
  }

  </style>
  