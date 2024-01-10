<template>
    <div class="bg-image">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="card" style="width: 100%;">
              <h2 class="card-title">Sign Up</h2>
              <form @submit.prevent="signUp">
                <div class="form-group">
                  <input type="text" v-model="username" class="form-control" placeholder="Username" required>
                </div>
                <div class="mb-4">
                  <input type="password" v-model="password" class="form-control" placeholder="Password" required>
                </div>
                <div class="mb-4">
                  <input type="password" v-model="confirmPassword" class="form-control" placeholder="Confirm Password" required>
                </div>
                <button type="submit" class="btn-signup">Sign Up</button>
                <div class="text-center">
                  <router-link to="/login" class="link-login">Already have an account? Login</router-link>
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
        confirmPassword: '',
      };
    },
    methods: {
      async signUp() {
        if (this.password !== this.confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
  
        try {
          await UserService.register(this.username, this.password);
          console.log('Sign up successful:');
          this.$router.push('/login');
        } catch (error) {
          console.error('Sign up failed:', error.message);
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
    background: flex;
    background-color: #ccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .card-title {
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
  .btn-signup {
    width: 100%;
    padding: 10px;
    background-color: #f5f5f5;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  .btn-signup:hover {
    background-color: #e6e6e6;
    color: white;
  }
  
  .link-login {
    color: black;
    text-decoration: underline;
    cursor: pointer;
  }
  
  .link-login:hover {
    color: #e6e6e6;
  }
  </style>