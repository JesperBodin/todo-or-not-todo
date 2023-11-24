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
        @remove="remove"
        @toggleDone="toggle"
        @save-edited-todo="save"
      />
    </ul>
    <div v-if="selectedTodo">
      <input type="text" v-model="selectedTodo.newTodo" />
    </div>
    <!-- DONE TODOS -->
    <header>
      <h1 v-if="!hideDone">TODON'T</h1>
    </header>
    <ul v-if="!hideDone" class="todo-list">
      <TodoListItem
        v-for="todo in completedTodos"
        :key="todo.id"
        :todo="todo"
        @remove="remove"
        @toggleDone="toggle"
        @save-edited-todo="save"
      />
    </ul>
  </main>
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
      // "savedTodo",
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
    save({ id, newTodo }) {
      console.log("saving edited todo", id, newTodo);
      const index = this.todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        this.todos[index].newTodo = newTodo;
        this.editTodo(this.todos[index]);
      }
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

.todo-form {
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo-input {
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 24px;
  width: 300px;
  height: 30px;
}
.date-input {
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 24px;
  height: 30px;
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
