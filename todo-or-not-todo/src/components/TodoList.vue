<template>
  <div class="bg-image" 
     style="background-image: url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg');
            height: 100vh">
  <div class="container mx auto">
    <!-- <header class="mb-4">
      <h2>{{ $t("todo") }}</h2>
    </header> -->
    <main >
      <TodoCreator @add="add" class="mt-5"/>
      <div class="btn-group-lg mb-3">
        <button @click="removeAll" class="btn btn-primary btn-danger me-2">
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
      <table class="table table-striped table-bordered table-responsive">
        <thead>
            <tr>
              <th colspan="4" class="text-center">{{ $t("activeTable") }}</th>
            </tr>
          </thead>
        <thead>
          <tr>
            <th class="text-center">{{ $t("dueDate") }}</th>
            <th class="text-center">{{ $t("todoText") }}</th>
            <th class="text-center">{{ $t("edit") }}</th>
            <th class="text-center">{{ $t("remove") }}</th>
          </tr>
        </thead>
        <tbody>
          <TodoListItem
            v-for="todo in activeTodos"
            :key="todo.id"
            :todo="todo"
            @remove="remove"
            @toggleDone="toggle"
            @edit-todo="edit"
            @save-edited-todo="save"
          />
        </tbody>
      </table>
      <!-- DONE TODOS -->
      <!-- <header class="mb-4">
        <h2 v-if="!hideDone">{{ $t("done") }}</h2>
      </header> -->
      <table v-if="!hideDone" class="table table-striped table-bordered table-responsive">
        <thead>
            <tr>
              <th colspan="4" class="text-center">{{ $t("completedTable") }}</th>
            </tr>
          </thead>
        <thead>
          <tr>
            <th class="text-center">{{ $t("dueDate") }}</th>
            <th class="text-center">{{ $t("todoText") }}</th>
            <th class="text-center">{{ $t("edit") }}</th>
            <th class="text-center">{{ $t("remove") }}</th>
          </tr>
        </thead>
        <tbody>
          <TodoListItem
            v-for="todo in completedTodos"
            :key="todo.id"
            :todo="todo"
            @remove="remove"
            @toggleDone="toggle"
            @save-edited-todo="save"
          />
        </tbody>
      </table>
    </main>
  </div>
  </div>
</template>

<script>
import { todoStore } from "../stores/TodoStore";
import { mapState, mapWritableState, mapActions } from "pinia";
import TodoListItem from "./TodoListItem.vue";
import TodoCreator from "./TodoCreator.vue";

export default {
  components: {
    TodoListItem,
    TodoCreator,
  },
  computed: {
    ...mapState(todoStore, ["selectedTodo"]),
    ...mapWritableState(todoStore, [
      "newTodo",
      "todos",
      "hideDone",
      "dueDate",
      "selectedTodo",
    ]),

    filteredTodos() {
      return this.hideDone ? this.todos.filter((t) => !t.done) : this.todos;
    },

    activeTodos() {
      return this.todos.filter((todo) => !todo.done);
    },
    completedTodos() {
      return this.todos.filter((todo) => todo.done);
    },
  },

  methods: {
    ...mapActions(todoStore, [
      "addTodo",
      "removeOneTodo",
      "removeAllTodos",
      "sortByDate",
      "toggleDone",
      "editTodo",
    ]),

    add(todo) {
      this.addTodo(todo);
    },

    remove(todo) {
      console.log("Clicking the remove button in parent");
      this.removeOneTodo(todo);
    },

    removeAll() {
      this.removeAllTodos();
    },

    sort() {
      this.sortByDate();
    },
    toggle(id) {
      this.toggleDone(id);
    },
    edit(todo) {
      console.log("Edit event received in parent", todo);
      this.selectedTodo = { ...todo };
    },
    save({ id, newTodo, dueDate }) {
      console.log("saving edited todo", id, newTodo, dueDate);
      const index = this.todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        this.todos[index].newTodo = newTodo;
        this.todos[index].dueDate = dueDate;
        this.editTodo(this.todos[index]);
      }
    },

    toggleLocale() {
      this.currentLocale = this.currentLocale === "en" ? "sv" : "en";
      this.$i18n.locale = this.currentLocale;
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}


.todo-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
</style>
