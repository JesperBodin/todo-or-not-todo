<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title text-center mb-4">Login</h2>
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="username" class="form-label">Username:</label>
                  <input type="text" id="username" v-model="username" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password:</label>
                  <input type="password" id="password" v-model="password" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import UserService from '../services/UserService';

  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
            const response = await UserService.login(this.username, this.password);

            console.log('Login successful:', response);

        } catch(error) {
            console.error('Login failed:', error.message);
        }
      },
    },
  };
  </script>
  
  <style></style>