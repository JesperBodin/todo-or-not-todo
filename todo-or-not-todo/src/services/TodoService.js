import ApiService from './ApiService';

const TODO_API_BASE_URL = import.meta.env.VITE_SERVER_URL;

 class TodoService extends ApiService {
  constructor() {
    super(TODO_API_BASE_URL);
    const token = sessionStorage.getItem('jwtToken');
    this.setAuthorizationHeader(token);
  }

  async addTodo(newTodo, dueDate) {
    const todoData = {
      newTodo: newTodo,
      dueDate: dueDate,
      done: false,
    };
    return await this.makeRequest('POST', '/add', todoData);
  }

  async removeAllTodos() {
    return await this.makeRequest('DELETE', '/delete');
  }

  async removeTodo(id) {
    return await this.makeRequest('DELETE', `/delete/${id}`);
  }

  async updateTodo(todo) {
    return await this.makeRequest('PUT', `/update/${todo.id}`, todo);
  }

  async getAllTodos() {
    return await this.makeRequest('GET', '');
  }
}

export default new TodoService();
