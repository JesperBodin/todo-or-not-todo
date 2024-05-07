<template>
  <div
    class="background"

  >
      <main>
        <TodoCreator />
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

    beforeMount() {
      this.getAllTodos();
    },

  methods: {
    ...mapActions(todoStore, ["getAllTodos"]),

    logout() {
      sessionStorage.removeItem('jwtToken')
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.background{
  background-color: white;
}
</style>
