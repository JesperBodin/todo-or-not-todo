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

    const response = await this.makeRequest('POST', '/login', loginData);

    const token = response.accessToken;
    

    console.log(token)

    sessionStorage.setItem('jwtToken', token);

    this.setAuthorizationHeader(token)

    return response;
  }

  async register(username, password) {
    const signUpData = {
      username: username,
      password: password,
    };

    await this.makeRequest('POST', '/register', signUpData);
  }
}


export default new UserService();