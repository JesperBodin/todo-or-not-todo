// import { userStore } from "../stores/UserStore";

export default class ApiService {
    constructor(baseURL) {
      this.baseURL = baseURL;
      this.headers = {};
    }

    setAuthorizationHeader(token) {
      this.headers = {
        ...this.headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }
  
    async makeRequest(method, endpoint, data = null) {
      const token = sessionStorage.getItem('jwtToken');
      if (token) {
        this.headers['Authorization'] = `Bearer ${token}`;
      }


      const url = `${this.baseURL}${endpoint}`;
      const headers = {
        ...this.headers,
        'Content-Type': 'application/json',
      };
  
      const config = {
        method: method,
        headers: headers,
      };
  
      if (data) {
        config.body = JSON.stringify(data);
      }
  
      try {
        const response = await fetch(url, config);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return await response.json();
        } else {
          return response.text();
        }
      
      } catch (error) {
        console.error(`Error making ${method} request to ${url}:`, error.message);
        throw error;
      }
    }
  }

