<template>
  <form @submit.prevent="add" action="/action_page.php">
    <div class="input-group">
    <input
      v-model="newTodo"
      type ="text"
      placeholder="Enter todo.."
      class=""
      required
    />
    <input v-model="dueDate" type="date" class="" />
    <button type="submit" class="">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
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
    ...mapActions(todoStore, ["addTodo"]),

    add() {
      this.addTodo(this.newTodo, this.dueDate);
      this.$emit("todo-added", this.newTodo);
    },
  },
};
</script>

<style scoped>

form {
  padding: 10px;
  margin: auto;
}

.input-group {
  display: flex;
  justify-content: space-between;
}

input[type="text"],
input[type="date"] {
  flex: 5;
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  margin-right: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type="submit"] {
  flex: 1; 
  padding: 10px;
  margin: 5px 0;
  background-color: #f5f5f5;
  color: #333;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type="submit"]:hover {
  background-color: #e6e6e6;
  white-space: nowrap;
}

</style>
