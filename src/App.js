import { useState } from "react";

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Learn React.js' },
  { id: 1, title: 'Build a todo app' },
  { id: 2, title: 'Deploy to gh-pages' },
];

export default function App() {

  const [todos, setTodos] = useState(initialTodos);

  function handleAddTodo(title) {
    // Replace the state with a new array
    setTodos([
      // Create a new array which contains the
      // existing items and a new item at the end.
      // ... is the object spread syntax used to create a copy of an object.
      ...todos,
      {
        id: nextId++,
        title: title,
      }
    ]);
  }

  return (
    <>
      <AddTodo onAddTodo={handleAddTodo} />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            {/* Add a space */}
            {' '}
            <button onClick={() => {
              // The filter() method creates a new array filled with
              // elements that pass a test provided by a function.
              // Use filter() instead of splice() to avoid mutating
              // the original array.
              // setTodos(todos.filter((t) => t.id !== todoId))
              setTodos(
                todos.filter((t) => {
                  return t.id !== todo.id;
                })
              );
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

// ********************** components **********************


function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');

  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        // The target event property returns the element
        // that triggered the event.
        onChange={(event) => setTitle(event.target.value)}
      />
      <button
        onClick={
          () => {
            setTitle(''); // clear input
            onAddTodo(title);
          }
        }
      >
        Add
      </button>
    </>
  );
}
