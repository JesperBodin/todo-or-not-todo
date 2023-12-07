import { defineStore } from "pinia";
import { addTodoApi, removeTodoApi, removeAllTodosApi, updateTodoApi } from '../api-calls/api';

export const todoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),

  actions: {

    async addTodo(newTodo, dueDate){

     const todo = await addTodoApi(newTodo, dueDate);
      this.todos.push(todo);
    },


   async removeOneTodo(id) {
     await removeTodoApi(id);
      const index = this.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    },
 
    async removeAllTodos() {
      await removeAllTodosApi();
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

    async toggleDone(id) {
      const todo = this.todos.find((item) => item.id === id);
      if (todo) {
        todo.done = !todo.done;
        await this.updateTodo({
          id: todo.id,
          newTodo: todo.newTodo,
          dueDate: todo.dueDate,
          done: todo.done,
        });
      }
    },

    async updateTodo(todo) {

        const updatedTodo = await updateTodoApi(todo);
    
        const tempTodo = {
          id: todo.id,
          newTodo: todo.newTodo, 
          dueDate: todo.dueDate, 
          done: todo.done,
        };
    
        const indexToUpdate = this.todos.findIndex(item => item.id === updatedTodo.id);
        if (indexToUpdate !== -1) {
          this.todos[indexToUpdate].newTodo = tempTodo.newTodo;
          this.todos[indexToUpdate].dueDate = tempTodo.dueDate;
          this.todos[indexToUpdate].done = tempTodo.done;

        }
    }
  },


    // editTodo() {
    //   this.todos;
    // },

});
