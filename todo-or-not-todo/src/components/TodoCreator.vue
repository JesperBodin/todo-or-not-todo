<template>
  <form @submit.prevent="add" class="todo-form">
    <input v-model="newTodo" placeholder="Enter todo.." class="todo-input" />
    <input v-model="dueDate" type="date" class="date-input" />
    <button type="submit" class="addBtn">Add todo</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newTodo: "",
      dueDate: "",
    };
  },
  methods: {
    add() {
      this.$emit("add", {
        id: Date.now(),
        newTodo: this.newTodo,
        dueDate: this.dueDate,
      });
    },
  },
};
</script>

<style scoped></style>
