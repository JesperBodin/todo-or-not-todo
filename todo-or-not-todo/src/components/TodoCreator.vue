<template>
  <form @submit.prevent="add" class="todo-form" action="/action_page.php">
    <input v-model="newTodo" placeholder="Enter todo.." class="todo-input form-control" required />
    <input v-model="dueDate" type="date" class="date-input form-control " />
    <button type="submit" class="btn btn-primary text-nowrap"><i class="bi bi-plus-lg"></i></button>
  </form>
</template>

<script>
import { todoStore } from "../stores/TodoStore";
import { mapActions } from "pinia";


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
    ...mapActions(todoStore, [
      "addTodo",
    ]),

     add() {
        this.addTodo(this.newTodo, this.dueDate)
        this.$emit('todo-added', this.newTodo);
    },
  },
  };
</script>

<style scoped>


</style>
