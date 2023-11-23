<template>
  <li class="todo-item">
    <button @click="removeTodo" class="removeBtn">x</button>
    <div class="todo-cell due-date">
      <p>Deadline: {{ todo.dueDate }}</p>
    </div>
    <div class="todo-cell text">
      <h3
        class="todo-text"
        :class="{ done: todo.done }"
        @click="toggleDone(todo.id)"
      >
        {{ todo.newTodo }}
      </h3>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },

    // remove: {
    //   type: Function,
    //   required: true,
    // },

    // toggleDone: {
    //   type: Function,
    //   required: true,
    // },
  },

  methods: {
    removeTodo() {
      this.$emit("remove", this.todo);
    },

    toggleDone() {
      this.$emit("toggleDone", this.todo.id);
    },
  },
};
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
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

.todo-cell {
  flex: 1;
  padding: 5px;
}

.due-date {
  font-size: 16px;
}

.text {
  font-size: 16px;
}

.done {
  text-decoration: line-through;
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
