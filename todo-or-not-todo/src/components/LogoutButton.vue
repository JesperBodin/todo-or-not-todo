<template>
    <div class="logout-container">
      <button @click="logout" class="logout-button">Logout</button>
    </div>
</template>
  
  <script>

  export default {

    data() {
    return {};
  },

    methods: {  
      logout() {
        sessionStorage.removeItem('jwtToken')
        sessionStorage.removeItem('username');
        this.$router.push('/login');
      }
    },
  };
  </script>
  
  <style scoped>

.username {
  margin-right: 10px;
  font-weight: bold;
  font-size: 16px;
  color: #333; 
}
.logout-container {
  position: absolute;
  top: 10px; 
  right: 10px; 
}

.logout-button {
  padding: 0 10px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ff4d1a;
  background-color: #ff4d4d;
  color: #333;
  cursor: pointer;
  margin-right: 5px;
}

.logout-button:hover {
  background-color: #ff3333;
}
  </style>
  