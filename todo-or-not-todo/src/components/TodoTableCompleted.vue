<template>
  <div class="table-container">
    <table v-if="!hideDone" class="styled-table">
      <thead>
        <tr>
          <th colspan="4" class="table-header">{{ $t("completedTable") }}</th>
        </tr>
        <tr>
          <th class="table-column">{{ $t("dueDate") }}</th>
          <th class="table-column">{{ $t("todoText") }}</th>
          <th class="table-column">{{ $t("edit") }}</th>
          <th class="table-column">{{ $t("remove") }}</th>
        </tr>
      </thead>
    </table>
    
    <div class="table-body-container">
      <table v-if="!hideDone" class="styled-table">
      <tbody>
        <TodoTableRow v-for="todo in completedTodos" :key="todo.id" :todo="todo" @remove="remove" @toggleDone="toggle"
          @save-edited-todo="update" />
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { todoStore } from "../stores/TodoStore";
import { mapWritableState, mapActions } from "pinia";
import TodoTableRow from "./TodoTableRow.vue";

export default {
  data() {
    return {}
  },

  components: {
    TodoTableRow,
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
      "removeOneTodo",
      "toggleDone",
      "updateTodo"
    ]),

    remove(todo) {
      this.removeOneTodo(todo.id);
    },

    toggle(id) {
      this.toggleDone(id);
    },

    update(todo) {
      this.updateTodo(todo);
    },

  },
};
</script>

<style scoped>

.table-container {
  max-width: 100%;
  min-width: 800px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.table-body-container {
  max-height: 220px;
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.table-body-container::-webkit-scrollbar {
    display: none;
}


.styled-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0  0 10px rgba(0, 0, 0, 0.1);
}

.styled-table thead tr {
  background-color: #f5f5f5;
  border: 1px solid black;
}

.table-header {
  text-align: center;
  padding: 10px;
}

.table-column {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid black;
}

.styled-table tbody tr:nth-child(even) {
  background-color: #fafafa;
}

.styled-table tbody tr:hover {
  background-color: #f0f0f0;
}
</style>