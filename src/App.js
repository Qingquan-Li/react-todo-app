import { useState } from "react";

import AddTodo from "./components/AddTodo";
import TaskList from "./components/TaskList";

let nextId = 0;

export default function App() {
  // Set the local variable nextId=0 here,
  // the `id` in `setTodos()` will always be zero.
  // let nextId = 0;
  const [todos, setTodos] = useState([]);

  // function handleAddTodo(title) {
  const handleAddTodo = (title) => {
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
      <AddTodo onAddTodo={handleAddTodo}/>
      <TaskList todos={todos} />
    </>
  );
}
