<template>
    <div class="bg-image d-flex align-items-center justify-content-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card p-4" style="width: 100%;">
              <h2 class="card-title text-center mb-4">Login</h2>
              <form @submit.prevent="login">
                <div class="mb-4">
                  <input type="text" id="username" v-model="username" class="form-control form-control-xxl" placeholder="Username" required>
                </div>
                <div class="mb-4">
                  <input type="password" id="password" v-model="password" class="form-control form-control-xxl" placeholder="Password" required>
                </div>
                <button type="submit" class="btn btn-primary btn-lg w-100 mb-3">Login</button>
                <div class="text-center">
                  <router-link to="/register" class="link-primary">Sign Up</router-link>
                </div>
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
          this.$router.push('/todo');
        } catch (error) {
          console.error('Login failed:', error.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .bg-image {
    background-image: url(https://mdbootstrap.com/img/Photos/Others/images/76.jpg);
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
  }
  
  .form-control-xxl {
    padding: 1.75rem 0.75rem;
    font-size: 1.5rem; 
  }
  
  .btn-lg {
    padding: 1rem 2rem;
    font-size: 1.5rem; 
  }
  
  .link-primary {
    color: #007bff;
    text-decoration: underline;
    cursor: pointer;
  }
  
  .link-primary:hover {
    color: #0056b3;
  }
  </style>