import { useState } from "react";

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');

  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        // Traditional anonymous function:
        // onChange={
        //   (function (event) {
        //     setTitle(event.target.value)
        //   })
        // }
        // Use ES6 Arrow Function:
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
