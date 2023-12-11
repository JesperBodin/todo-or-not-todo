<template>
  <div class="table-responsive">
    <table v-if="!hideDone" class="table table-striped table-bordered">
      <thead>
        <tr>
          <th colspan="4" class="text-center">{{ $t("completedTable") }}</th>
        </tr>
        <tr>
          <th class="text-center">{{ $t("dueDate") }}</th>
          <th class="text-center">{{ $t("todoText") }}</th>
          <th class="text-center">{{ $t("edit") }}</th>
          <th class="text-center">{{ $t("remove") }}</th>
        </tr>
      </thead>
      <tbody>
        <TodoTableRow v-for="todo in completedTodos" :key="todo.id" :todo="todo" @remove="remove" @toggleDone="toggle"
          @save-edited-todo="update" />
      </tbody>
    </table>
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
.table-responsive {
  max-height: 40vh;
  min-width: 100vh;
}

thead {
  position: sticky;
  top: -1px;
  background-color: white;
}
</style>