<template>
  <form @submit.prevent="add" class="todo-form" action="/action_page.php">
    <input v-model="newTodo" placeholder="Enter todo.." class="todo-input form-control" required />
    <input v-model="dueDate" type="date" class="date-input form-control " />
    <button type="submit" class="btn btn-primary text-nowrap"><i class="bi bi-plus-lg"></i></button>
  </form>
</template>

<script>

import { addTodoApi } from '../api-calls/api';

export default {
  data() {
    return {
      id: null,
      newTodo: "",
      dueDate: "",
      done: false,
          };
},

  methods: {

    async add() {
        const newTodo = await addTodoApi(this.newTodo);
        console.log(newTodo)
        this.$emit('todo-added', newTodo);
    },
  },
  };
</script>

<style scoped>


</style>
