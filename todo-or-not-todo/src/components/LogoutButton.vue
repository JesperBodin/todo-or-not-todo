<template>
    <div class="logout-container">
      <button @click="logout" class="logout-button btn btn-primary btn-danger">Logout</button>
    </div>
</template>
  
  <script>

  export default {

    methods: {  
      logout() {
        sessionStorage.removeItem('jwtToken')
        this.$router.push('/login');
      }
    },
  };
  </script>
  
  <style scoped>
.logout-container {
  position: absolute;
  top: 10px; 
  right: 10px; 
}
  </style>
  