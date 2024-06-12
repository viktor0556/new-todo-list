import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function TodoInterface() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:2000/todos");
      console.log(response.data);
      setTodos(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const addTodo = async () => {
    try {
      if (description.trim() !== "") {
        const response = await axios.post("http://localhost:2000/todos", {
          description,
          selectedTime
        });
        setTodos([...todos, response.data]);
        setDescription("");
        setSelectedTime("");
      } else {
        alert("Fill in the field")
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateTodo = async (id, completed, description, selectedtime) => {
    try {
      await axios.put(`http://localhost:2000/todos/${id}`, { completed, description, selectedtime });
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, completed, selectedtime } : todo))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <div className="add-todo-container">
        <h1>To-Do List</h1>
        <div className="input-add-container">
          <div className="time-input-container">
          <input 
          className="time-input"
          type="time" 
          value={selectedTime} 
          onChange={handleTimeChange} 
          />
          </div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="add-button" onClick={addTodo}>
            Add
          </button>
        </div>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.selectedtime}</span>
            <span
              className={todo.completed ? 'completed' : ''}
            >
              {todo.description}
            </span>
            <button onClick={() => updateTodo(todo.id, !todo.completed, todo.description, todo.selectedTime)}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoInterface;
