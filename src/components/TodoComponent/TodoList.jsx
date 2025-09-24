import { useState, useCallback, memo, useEffect } from 'react';
import './TodoList.css';

export default function TodoList({ initialData = [] }) {
  const [todos, setTodos] = useState(() => {
    console.log('⚡ Lazy initializer function called');
    try {
      return JSON.parse(localStorage.getItem('todos')) || initialData;
    } catch {
      return initialData;
    }
  });

  const [todoDirect] = useState(hey());

  function hey() {
    console.log('direct');
    return JSON.parse(localStorage.getItem('todos')) || initialData;
  }

  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setError('Todo cannot be empty');
      return;
    }
    // case-insensitive duplicate check (optional)
    if (todos.some((t) => t.text.toLowerCase() === trimmed.toLowerCase())) {
      setError('Todo already exists');
      return;
    }

    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text: trimmed, isCompleted: false }]);
    setInput('');
    setError('');
  };

  // useCallback to stabilize functions passed to children
  const onToggle = useCallback((id) => {
    // console.log('onToggle');
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)));
  }, []); // no deps: setState setter is stable

  const deleteTodo = useCallback((id) => {
    // console.log('deleteTodo');
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      isEditing ? saveTodo() : addTodo();
    }
  };

  const editTodo = useCallback((todo) => {
    setIsEditing(true);
    setInput(todo.text);
    setEditingId(todo.id);
  }, []);

  const saveTodo = () => {
    if (!input.trim()) {
      setError('Todo cannot be empty');
      return;
    }

    setTodos((prev) => prev.map((t) => (t.id === editingId ? { ...t, text: input.trim() } : t)));
    setInput('');
    setError('');
    setIsEditing(false);
    setEditingId(null);
  };

  const markAllComplete = () => {
    setTodos((prev) => {
      if (prev.every((t) => t.isCompleted)) return prev; // no-op if all completed
      return prev.map((t) => ({ ...t, isCompleted: true }));
    });
  };

  const clearCompletedTodos = () => {
    setTodos((prev) => prev.filter((t) => t.isCompleted === false));
  };

  const toggleAll = () => {
    setTodos((prev) => {
      const allComplete = prev.every((t) => t.isCompleted);
      console.log(allComplete);
      return prev.map((t) => ({ ...t, isCompleted: !allComplete }));
    });
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError('');
          }}
          onKeyDown={handleKeyDown}
        />
        {!isEditing ? (
          <button onClick={addTodo} disabled={!input.trim()}>
            Add Todo
          </button>
        ) : (
          <button onClick={saveTodo} disabled={!input.trim()}>
            Save Todo
          </button>
        )}
      </div>

      {error && <p>{error}</p>}

      <div>
        <button onClick={markAllComplete} disabled={todos.length === 0}>
          Mark All Complete
        </button>
        <button onClick={clearCompletedTodos} disabled={!todos.some((t) => t.isCompleted)}>
          Clear Completed
        </button>
        <button onClick={toggleAll}>toggleAll</button>
      </div>
      <ul>
        {todos.length > 0 ? (
          todos?.map((todo) => (
            // pass stable callbacks and `todo` object (unchanged items keep same reference)
            <MemoisedTodo
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              setInput={setInput}
            />
          ))
        ) : (
          <div>No Todos present </div>
        )}
      </ul>
    </div>
  );
}

// Memoized child
const MemoisedTodo = memo(function TodoItem({ todo, onToggle, deleteTodo, editTodo, setInput }) {
  console.log('Rendering TodoItem:', todo.text);
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        id={`todo-${todo.id}`}
        checked={todo.isCompleted}
        onChange={() => onToggle(todo.id)} // fine here; this is created inside child
      />
      <label htmlFor={`todo-${todo.id}`} className={todo.isCompleted ? 'completed' : ''}>
        {todo.text}
      </label>
      <button onClick={() => editTodo(todo)}>Edit</button>
      <button
        onClick={() => deleteTodo(todo.id)}
        aria-label={`Delete ${todo.text}`}
        className="delete-btn"
      >
        Delete
      </button>
    </li>
  );
}, compare);

function compare(prev, next) {
  return (
    prev.todo.isCompleted === next.todo.isCompleted &&
    prev.todo.text === next.todo.text &&
    prev.onToggle === next.onToggle &&
    prev.deleteTodo === next.deleteTodo
  );
}

/**
 Persistent storage → Use localStorage or API integration so todos survive reloads.
Empty state UI → When no todos, show a friendly message.
 */
