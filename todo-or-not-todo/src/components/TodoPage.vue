<template>
  <div
    class="bg-image"
    :style="{
      backgroundImage:
        'url(https://mdbootstrap.com/img/Photos/Others/images/76.jpg)',
      height: '100vh',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <div class="container mx auto">
      <main>
        <TodoCreator class="mt-5" />
        <TodoButtonGroup />
        <TodoTableActive>
          <TodoTableRow
            v-for="todo in activeTodos"
            :key="todo.id"
            :todo="todo"
            @remove="remove"
            @toggleDone="toggle"
            @save-edited-todo="update"
          />
        </TodoTableActive>

        <TodoTableCompleted>
          <TodoTableRow
            v-for="todo in completedTodos"
            :key="todo.id"
            :todo="todo"
            @remove="remove"
            @toggleDone="toggle"
            @save-edited-todo="update"
          />
        </TodoTableCompleted>
      </main>
    </div>
  </div>
</template>

<script>
import TodoTableRow from "./TodoTableRow.vue";
import TodoCreator from "./TodoCreator.vue";
import TodoTableActive from "./TodoTableActive.vue";
import TodoTableCompleted from "./TodoTableCompleted.vue";
import TodoButtonGroup from "./TodoButtonGroup.vue";
import { todoStore } from "../stores/TodoStore";
import { mapActions, mapWritableState } from "pinia";

export default {
  data() {
    return {};
  },

  components: {
    TodoTableRow,
    TodoCreator,
    TodoTableActive,
    TodoTableCompleted,
    TodoButtonGroup,
  },

  computed: {
    ...mapWritableState(todoStore, ["todos"]),
  },

  async onMounted() {
    this.getAllTodos();
  },

  methods: {
    ...mapActions(todoStore, ["getAllTodos"]),
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
</style>
