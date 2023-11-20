<script>
export default {
  data() {
    return {
      newTodo: "",
      todos: [
        { id: Date.now(), text: "Make a todo-list" },
        { id: Date.now(), text: "Make the todo-list cool" },
      ],
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== "") {
        this.todos.push({ id: Date.now(), text: this.newTodo });
        this.newTodo = "";
      }
    },

    removeTodo(todo) {
      const index = this.todos.indexOf(todo);
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    },

    removeAll() {
      this.todos = [];
    },

    sortByLetter() {
      this.todos.sort((a, b) => {
        const todoA = a.text.toLowerCase();
        const todoB = b.text.toLowerCase();
        if (todoA < todoB) return -1;
        if (todoA > todoB) return 1;
        return 0;
      });
    },
  },
};
</script>

<template>
  <main>
    <form @submit.prevent="addTodo" class="todo-form">
      <input v-model="newTodo" placeholder="Enter todo.." class="todo-input" />
      <button type="submit" class="addBtn">Add todo</button>
    </form>
    <button @click="removeAll" class="removeAllBtn">Remove All</button>
    <button @click="sortByLetter" class="sortByLetterBtn">Sort</button>
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <button @click="removeTodo(todo)" class="removeBtn">x</button>
        <br />
        <h3 class="todo-text">{{ todo.text }}</h3>
      </li>
    </ul>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.todo-form {
  margin-bottom: 20px;
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
  height: 40px;
}

.addBtn,
.removeAllBtn,
.sortByLetterBtn {
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 16px;
  width: 100px;
  height: 50px;
}

.removeAllBtn {
  background-color: #ff0000;
  padding: 0px 0px;
  height: 25px;
}

.sortByLetterBtn {
  background-color: blue;
  padding: 0px 0px;
  height: 25px;
}
.todo-form {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo-list {
  background-color: beige;
  padding: 10px;
  list-style: none;
  margin: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #000000;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 24px;
  height: 50px;
  width: 500px;
}

.todo-text {
  flex-grow: 1;
  margin-left: 10px;
}

.removeBtn {
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
