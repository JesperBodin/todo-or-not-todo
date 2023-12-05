<template>
 <div class="bg-image" :style="{ backgroundImage: 'url(https://mdbootstrap.com/img/Photos/Others/images/76.jpg)', height: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }">
  <div class="container mx auto">
    <main >
      <TodoCreator @todo-added="add" class="mt-5"/>
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
        <button @click="fetchAllData">fetchAllData</button>
      </div>
      <div v-if="getResult" class="alert alert-secondary mt-2" role="alert"><pre>{{getResult}}</pre></div>
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
            @edit-todo="edit"
            @save-edited-todo="saveEditedTodo"
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
            @save-edited-todo="saveEditedTodo"
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
import { mapState, mapWritableState, mapActions } from "pinia";
import TodoListItem from "./TodoListItem.vue";
import TodoCreator from "./TodoCreator.vue";
import { updateTodoApi, removeTodoApi, removeAllTodosApi } from "../api-calls/api";

export default {
  data(){
  return {
    getResult: null,
  }
},
  components: {
    TodoListItem,
    TodoCreator,
  },

  computed: {
    ...mapState(todoStore, ["selectedTodo"]),
    ...mapWritableState(todoStore, [
      "newTodo",
      "todos",
      "hideDone",
      "dueDate",
      "selectedTodo",
    ]),

    filteredTodos() {
      return this.hideDone ? this.todos.filter((t) => !t.done) : this.todos;
    },

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
      "editTodo",
    ]),

    remove(todo) {
      removeTodoApi(todo.id);
      this.removeOneTodo(todo.id);
    },

    async removeAll() {
      await removeAllTodosApi();
      this.removeAllTodos();
},


    sort() {
      this.sortByDate();
    },
    toggle(id) {
      this.toggleDone(id);
    },
    edit(todo) {
      console.log("Edit event received in parent", todo);
      this.selectedTodo = { ...todo };
    },
    save({ id, newTodo, dueDate }) {
      console.log("saving edited todo", id, newTodo, dueDate);
      const index = this.todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        this.todos[index].newTodo = newTodo;
        this.todos[index].dueDate = dueDate;
        this.editTodo(this.todos[index]);
      }
    },

    async saveEditedTodo(todo) {
  try {
    console.log('Before API call:', this.todos);

    // Update the todo on the server
    const updatedTodoFromServer = await updateTodoApi(todo.text, todo.date);

    console.log('After API call (server response):', updatedTodoFromServer);

    // Handle the updated todo in your local state
    const index = this.todos.findIndex((todo) => todo.id === updatedTodoFromServer.id);
    if (index !== -1) {
      // Update the local state with the updated todo
      this.$set(this.todos, index, updatedTodoFromServer);

      console.log('After updating local state:', this.todos);
    }
  } catch (error) {
    console.error('Error updating todo:', error.message);
  }
},

    toggleLocale() {
      this.currentLocale = this.currentLocale === "en" ? "sv" : "en";
      this.$i18n.locale = this.currentLocale;
    },

    add(newTodo){
      this.todos.push(newTodo);
    },

    formatResponse(res){
      return JSON.stringify(res, null, 2);
    },

    async fetchAllData(){
      try {
        const res = await fetch('http://localhost:8080/api/todo');

        if (!res.ok) {
          throw new Error('HTTP error! Status: $(res.status)');
        }

        const data = await res.json();

        const result = {
          data: data,
        };

        this.getResult = this.formatResponse(result);
      } catch (error) {
        this.getResult = error.message;
      }
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
