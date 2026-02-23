import { useState } from "react";

function TodoItem({ todo, onDelete }: { todo: string; onDelete: () => void }) {
  return (
    <li>
      {todo} <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export default function ToDoList() {
  const [todos, setTodos] = useState<string[]>(["Learn React", "Build a ToDo List"]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput("");
    }
  };
  const removeTodo = (idx: number) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <h2>Simple ToDo List</h2>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Add todo" />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, idx) => (
          <TodoItem key={idx} todo={todo} onDelete={() => removeTodo(idx)} />
        ))}
      </ul>
    </div>
  );
}
