<template>
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
   </template>
   
   <script>
   import { todoStore } from "../stores/TodoStore";
   import { mapWritableState, mapActions } from "pinia";
 
   export default {
     data(){
     return {}
   },
   
     components: {
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
         "removeAllTodos",
         "sortByDate",
       ]),
   

       removeAll() {
         this.removeAllTodos();
   },
   
       sort() {
         this.sortByDate();
       },
   
       toggleLocale() {
         this.currentLocale = this.currentLocale === "en" ? "sv" : "en";
         this.$i18n.locale = this.currentLocale;
       },
       
     },
   };
   </script>
   
   <style scoped></style>
   