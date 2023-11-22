import { defineStore } from "pinia";

export const todoStore = defineStore("todo", {
  state: () => ({
    newTodo: "",
    id: Date.now,
    hideDone: false,
    dueDate: null,
    todos: [],
  }),

  // getters
  getters: {
    activeTodos() {
      return this.todos.filter((todo) => !todo.done);
    },

    completedTodos() {
      return this.todos.filter((todo) => todo.done);
    },
  },

  // actions
  actions: {
    addTodo(task) {
      this.todos.push(task);
    },
  },

  removeOneTodo(todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  },

  removeAllTodos() {
    this.todos = [];
  },

  sortByDate() {
    this.todos.sort((a, b) => {
      const dueDateA = a.dueDate;
      const dueDateB = b.dueDate;

      if (!dueDateA) return -1;
      if (!dueDateB) return 1;

      if (dueDateA < dueDateB) return -1;
      if (dueDateA > dueDateB) return 1;

      return 0;
    });
  },

  toggleDone(id) {
    const todo = this.todos.find((item) => item.id === id);
    if (todo) {
      todo.done = !todo.done;
    }

    if (todo.done) {
      const index = this.activeTodos.indexOf(todo);
      if (index !== -1) {
        this.todos.splice(index, 1);
        this.completedTodos.push(todo);
      }
    } else {
      const index = this.completedTodos.indexOf(todo);
      if (index !== -1) {
        this.completedTodos.splice(index, 1);
        this.activeTodos.push(todo);
      }
    }
  },
});
