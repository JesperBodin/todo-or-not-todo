<template>
  <!-- <form @submit.prevent="add" class="todo-form">
    <input v-model="newTodo" placeholder="Enter todo.." class="todo-input" />
    <input v-model="dueDate" type="date" class="date-input" />
    <button type="submit" class="addBtn">Add todo</button>
  </form> -->
  <div class="todo-form">
    <input v-model="newTodo" placeholder="Enter todo.." class="todo-input" />
    <input v-model="dueDate" type="date" class="date-input" />
    <button @click="add" class="addBtn">Add todo</button>
  </div>
</template>

<script>
// import { mapActions } from "pinia";
// import { todoStore } from "../stores/TodoStore";

export default {
  data() {
    return {
      newTodo: "",
      dueDate: "",
    };
  },
  methods: {
    // ...mapActions(todoStore, ["addTodo"]),

    add() {
      const newTodo = {
        id: Date.now,
        text: this.newTodo,
        dueDate: this.dueDate,
        done: false,
      };
      console.log(newTodo);
      this.$emit("add", newTodo);
      this.newTodo = "";
      this.dueDate = "";
    },
  },
};
</script>

<style scoped>
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
</style>
