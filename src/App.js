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

  function handleDeleteTodo(todoID) {
    // The filter() method creates a new array filled with
    // elements that pass a test provided by a function.
    // Use filter() instead of splice() to avoid mutating
    // the original array.
    // setTodos(todos.filter((t) => t.id !== todoId))
    setTodos(
      todos.filter((t) => {
        return t.id !== todoID;
      })
    );
  }

  function handleChangeTodo(nextTodo) {
    setTodos(todos.map(t => {
      if (t.id === nextTodo.id) {
        return nextTodo;
      } else {
        // No changes
        return t;
      }
    }));
  }

  return (
    <>
      <AddTodo onAddTodo={handleAddTodo} />
      <TaskList
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        onChangeTodo={handleChangeTodo}
      />
    </>
  );
}

// ********************** components **********************

function TaskList({ todos, onDeleteTodo, onChangeTodo }) {
  
  return (
    <ul>
      {/* {todos.map(todo => ( */}
      {todos.map(
        (todo) => {
          return (
            <li key={todo.id}>
              <Task
                todo={todo}
                onDelete={onDeleteTodo}
                onChange={onChangeTodo}
              />
            </li>
          );
        }
      )}
    </ul>
  )
}

function Task({ todo, onDelete, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;

  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={
            (event) => {
              onChange({
                // Make a copy.
                ...todo,
                // The target event property returns the element
                // that triggered the event.
                title: event.target.value
              });
            }
          }
        />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }

  return (
    <>
      {todoContent}
      <button onClick={() => {
        onDelete(todo.id)
      }}>
        Delete
      </button>
    </>
  )
}

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
