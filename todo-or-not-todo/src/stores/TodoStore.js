import { defineStore } from "pinia";
import { addTodoApi } from '../api-calls/api';

export const todoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),

  actions: {

    async addTodo(newTodo, dueDate){

     const todo = await addTodoApi(newTodo, dueDate);
      this.todos.push(todo);
    },

    
    removeOneTodo(id) {
      const index = this.todos.findIndex(todo => todo.id === id);
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
    },

    // editTodo() {
    //   this.todos;
    // },
  },
});
