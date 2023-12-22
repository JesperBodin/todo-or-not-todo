<template>
    <div class="bg-image d-flex align-items-center justify-content-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card p-4" style="width: 100%;">
              <h2 class="card-title text-center mb-4">Sign Up</h2>
              <form @submit.prevent="signUp">
                <div class="mb-4">
                  <input type="text" id="username" v-model="username" class="form-control form-control-xxl" placeholder="Username" required>
                </div>
                <div class="mb-4">
                  <input type="password" id="password" v-model="password" class="form-control form-control-xxl" placeholder="Password" required>
                </div>
                <div class="mb-4">
                  <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control form-control-xxl" placeholder="Confirm Password" required>
                </div>
                <button type="submit" class="btn btn-primary btn-lg w-100 mb-3">Sign Up</button>
                <div class="text-center">
                  <router-link to="/login" class="link-primary">Already have an account? Login</router-link>
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