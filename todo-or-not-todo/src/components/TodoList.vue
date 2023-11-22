<template>
  <header>
    <h1>TODO</h1>
  </header>
  <main>
    <TodoCreator @add="add" />
    <div class="button-container">
      <button @click="removeAll" class="removeAllBtn">Remove All</button>
      <button @click="sort" class="sortByLetterBtn">Sort</button>
      <button @click="hideDone = !hideDone" class="hideDoneBtn">
        {{ hideDone ? "Show done" : "Hide done" }}
      </button>
    </div>
    <ul class="todo-list">
      <TodoListItem
        v-for="todo in activeTodos"
        :key="todo.id"
        :todo="todo"
        :removeTodo="remove"
        :toggleDone="toggle"
      />
    </ul>
    <!-- DONE TODOS -->
    <header>
      <h1 v-if="!hideDone">TODON'T</h1>
    </header>
    <ul v-if="!hideDone" class="todo-list">
      <TodoListItem
        v-for="todo in completedTodos"
        :key="todo.id"
        :todo="todo"
        :remove="remove"
        :toggleDone="toggle"
      />
    </ul>
  </main>
</template>

<script>
import { todoStore } from "../stores/TodoStore";
import { mapWritableState, mapActions } from "pinia";
import TodoListItem from "./TodoListItem.vue";
import TodoCreator from "./TodoCreator.vue";

export default {
  components: {
    TodoListItem,
    TodoCreator,
  },
  computed: {
    ...mapWritableState(todoStore, ["newTodo", "todos", "hideDone", "dueDate"]),

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
    ]),
    add(task) {
      this.addTodo(task);
    },

    remove(todo) {
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
  },
};
</script>

<style scoped>
main,
header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

button:hover {
  text-decoration: underline;
}

.addBtn,
.removeAllBtn,
.hideDoneBtn,
.sortByLetterBtn {
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 16px;
  width: 100px;
  height: 50px;
}

.removeAllBtn,
.sortByLetterBtn,
.hideDoneBtn {
  background-color: #ff0000;
  padding: 0px 0px;
  height: 25px;
}

.sortByLetterBtn {
  background-color: blue;
}

.hideDoneBtn {
  background-color: purple;
}

.todo-form {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo-list {
  background-color: beige;
  padding: 10px;
  list-style: none;
  margin: 0;
}
</style>
