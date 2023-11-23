<template>
  <form @submit.prevent="add" class="todo-form">
    <input v-model="newTodo" placeholder="Enter todo.." class="todo-input" />
    <input v-model="dueDate" type="date" class="date-input" />
    <button type="submit" class="addBtn">Add todo</button>
  </form>
</template>

<script>
import { mapWritableState, mapActions } from "pinia";
import { todoStore } from "../stores/TodoStore";

export default {
  computed: {
    ...mapWritableState(todoStore, ["newTodo", "todos", "hideDone", "dueDate"]),
  },
  methods: {
    ...mapActions(todoStore, ["addTodo"]),
    add() {
      this.$emit("add", { newTodo: this.newTodo, dueDate: this.dueDate });
      this.newTodo = "";
      this.dueDate = "";
    },
  },
};
</script>

<style scoped></style>
