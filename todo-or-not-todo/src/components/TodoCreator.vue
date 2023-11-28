<template>
  <form @submit.prevent="add" class="todo-form" action="/action_page.php">
    <input v-model="newTodo" placeholder="Enter todo.." class="todo-input form-control" required />
    <input v-model="dueDate" type="date" class="date-input form-control " />
    <button type="submit" class="btn btn-primary text-nowrap"><i class="bi bi-plus-lg"></i></button>
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
      this.newTodo = "";
      this.dueDate = "";
      }
  },
};
</script>

<style scoped>


</style>
