import ApiService from "./ApiService";

const USER_API_BASE_URL = import.meta.env.VITE_SERVER_AUTH_URL;

class UserService extends ApiService {
  constructor() {
    super(USER_API_BASE_URL);
  }

  async login(username, password) {
    const loginData = {
      username: username,
      password: password,
    };

    try {
    const response = await this.makeRequest('POST', '/login', loginData);

    const token = response.accessToken;
    

    console.log(token)

    sessionStorage.setItem('jwtToken', token);

    return response;

  } catch(error) {
    console.error('Error during login', error.message)
    throw error;
  }
}


}

export default new UserService();