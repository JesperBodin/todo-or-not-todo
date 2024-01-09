<template>
    <div class="logout-container">
      <button @click="logout" class="logout-button">Logout</button>
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

.logout-button {
  padding: 0 10px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #ff4d4d;
  color: #333;
  cursor: pointer;
  margin-right: 5px;
}

.logout-button:hover {
  background-color: #ff3333;
}
  </style>
  