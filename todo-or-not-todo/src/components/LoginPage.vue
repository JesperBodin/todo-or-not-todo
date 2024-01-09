<template>
    <div class="bg-image">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="card" style="width: 100%;">
              <h2 class="card-title">Login</h2>
              <form @submit.prevent="login">
                <div class="form-group">
                  <input type="text" id="username" v-model="username" class="form-control" placeholder="Username" required>
                </div>
                <div class="mb-4">
                  <input type="password" id="password" v-model="password" class="form-control" placeholder="Password" required>
                </div>
                <button type="submit" class="btn btn-login">Login</button>
                <div class="text-center">
                  <router-link to="/register" class="link-signup">Sign Up</router-link>
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
    background-image: url(https://i.imgur.com/I4IF27V.jpg);
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    width: 100%;
    max-width: 600px;
    padding: 20px;
  }
  
  .card {
    background: #ccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4 px rgba(0, 0, 0, 0.1);
  }
  
  .card-title{
    text-align: center;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-control {
    width: 100%;
    padding: 10px;
    background-color: #f5f5f5;
    color: black;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
  }

  .btn-login {
    width: 100%;
    padding: 10px;
    background-color: #f5f5f5;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
   }

   .btn-login:hover {
    background-color: #e6e6e6;
   }
  

  .link-signup {
  color: black;
  text-decoration: underline;
  cursor: pointer;
}
  
  .link-signup:hover {
    color: #e6e6e6;
  }

  .link-signup:visited {
    color: black;
  }

  .link-signup:visited:hover {
    color: #e6e6e6;
  }

  .text-center {
  text-align: center;
}
  </style>