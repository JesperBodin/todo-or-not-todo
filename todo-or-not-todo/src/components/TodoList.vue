<template>
 <div class="bg-image" :style="{ backgroundImage: 'url(https://mdbootstrap.com/img/Photos/Others/images/76.jpg)', height: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }">
  <div class="container mx auto">
    <main >
      <TodoCreator class="mt-5"/>
      <div class="btn-group-lg mb-3">
        <button @click="removeAll" class="btn btn-primary btn-danger me-2">
          {{ $t("removeAll") }}
        </button>
        <button @click="sort" class="btn btn-primary me-2">{{ $t("sort") }}</button>
        <button @click="hideDone = !hideDone" class="btn btn-primary me-2">
          {{ $t(hideDone ? "showDone" : "hideDone") }}
        </button>
        <button class="btn btn-primary me-2" @click="toggleLocale">
          {{ $t("language") }}
        </button>
      </div>
      <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
              <th colspan="4" class="text-center">{{ $t("activeTable") }}</th>
            </tr>
          <tr>
            <th class="text-center">{{ $t("dueDate") }}</th>
            <th class="text-center">{{ $t("todoText") }}</th>
            <th class="text-center">{{ $t("edit") }}</th>
            <th class="text-center">{{ $t("remove") }}</th>
          </tr>
        </thead>
    
        <tbody >
          <TodoListItem
            v-for="todo in activeTodos"
            :key="todo.id"
            :todo="todo"
            @remove="remove"
            @toggleDone="toggle"
            @save-edited-todo="update"
          />
        </tbody>
      </table>
    </div>
    <div class="table-responsive">
      <table v-if="!hideDone" class="table table-striped table-bordered">
        <thead>
          <tr>
              <th colspan="4" class="text-center">{{ $t("completedTable") }}</th>
            </tr>
          <tr>
            <th class="text-center">{{ $t("dueDate") }}</th>
            <th class="text-center">{{ $t("todoText") }}</th>
            <th class="text-center">{{ $t("edit") }}</th>
            <th class="text-center">{{ $t("remove") }}</th>
          </tr>
        </thead>
        <tbody>
          <TodoListItem
            v-for="todo in completedTodos"
            :key="todo.id"
            :todo="todo"
            @remove="remove"
            @toggleDone="toggle"
            @save-edited-todo="update"
          />
        </tbody>
      </table>
    </div>
    </main>
  </div>
  </div>
</template>

<script>
import { todoStore } from "../stores/TodoStore";
import { mapWritableState, mapActions } from "pinia";
import TodoListItem from "./TodoListItem.vue";
import TodoCreator from "./TodoCreator.vue";

export default {
  data(){
  return {}
},

  components: {
    TodoListItem,
    TodoCreator,
  },

  computed: {
    ...mapWritableState(todoStore, [
      "newTodo",
      "todos",
      "hideDone",
      "dueDate",
    ]),

    activeTodos() {
      return this.todos.filter((todo) => !todo.done);
    },
    completedTodos() {
      return this.todos.filter((todo) => todo.done);
    },
  },

  methods: {
    ...mapActions(todoStore, [
      "addTodo",
      "removeOneTodo",
      "removeAllTodos",
      "sortByDate",
      "toggleDone",
      "updateTodo"
    ]),

    remove(todo) {
      this.removeOneTodo(todo.id);
    },

    removeAll() {
      this.removeAllTodos();
},

    sort() {
      this.sortByDate();
    },

    toggle(id) {
      this.toggleDone(id);
    },

    update(todo) {
        this.updateTodo( todo );
    },

    toggleLocale() {
      this.currentLocale = this.currentLocale === "en" ? "sv" : "en";
      this.$i18n.locale = this.currentLocale;
    },
    
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

.table-responsive{
  max-height: 40vh;
  min-width: 100vh;
}

thead {
  position: sticky;
  top: -1px;
  background-color: white;
}

</style>
