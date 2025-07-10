import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input, completed: false },
    ]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Styling objects
  const containerStyle: React.CSSProperties = {
    maxWidth: 400,
    margin: '40px auto',
    padding: 24,
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    fontFamily: 'system-ui, sans-serif',
  };
  const inputRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: 8,
    marginBottom: 16,
  };
  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: 6,
    fontSize: 16,
  };
  const addButtonStyle: React.CSSProperties = {
    padding: '8px 16px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 16,
    transition: 'background 0.2s',
  };
  const listStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };
  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0',
  };
  const deleteButtonStyle: React.CSSProperties = {
    marginLeft: 'auto',
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: 14,
    transition: 'background 0.2s',
  };
  const checkboxStyle: React.CSSProperties = {
    width: 18,
    height: 18,
    accentColor: '#007bff',
  };
  const todoTextStyle = (completed: boolean): React.CSSProperties => ({
    textDecoration: completed ? 'line-through' : 'none',
    color: completed ? '#aaa' : '#222',
    fontSize: 16,
    flex: 1,
    transition: 'color 0.2s',
  });

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 20, color: '#333', marginBottom: 8 }}>
        miki bar kiki
      </div>
      <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#007bff' }}>To-Do List</h2>
      <div style={inputRowStyle}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new task"
          style={inputStyle}
        />
        <button onClick={addTodo} style={addButtonStyle}>Add</button>
      </div>
      <ul style={listStyle}>
        {todos.map(todo => (
          <li key={todo.id} style={itemStyle}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={checkboxStyle}
            />
            <span style={todoTextStyle(todo.completed)}>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)} style={deleteButtonStyle}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
