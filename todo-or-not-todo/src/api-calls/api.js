export async function addTodoApi(newTodo, dueDate) {
    const todoData = {
      text: newTodo,
      deadLine: dueDate,
      done: false,
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/todo/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error adding todo:', error.message);
      throw error;
    }
  }

  export async function removeAllTodosApi() {
    try {
      const response = await fetch('http://localhost:8080/api/todo/delete', {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return 'Todos removed successfully';
    } catch (error) {
      console.error('Error removing todos:', error.message);
      throw error;
    }
  }

  export async function removeTodoApi(todoId) {

    try {
      const response = await fetch(`http://localhost:8080/api/todo/delete/${todoId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return `Todo with ID ${todoId} removed successfully`;
    } catch (error) {
      console.error('Error removing todo:', error.message);
      throw error;
    }
  }

  export async function updateTodoApi(todoId, updateTodo) {
    try {
      const response = await fetch(`http://localhost:8080/api/todo/update/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateTodo),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error updating todo:', error.message);
      throw error;
    }
  }