"use client";

import { useTodoStore } from "./useTodoStore";

export default function ZustandTodoList() {
  const { todos, todo, setTodo, addTodo, updateTodo, deleteTodo } = useTodoStore((state) => state);

  return (
    <div id="wd-zustand-todo-list" className="w-50">
      <h2>Zustand Todo List</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <button className="btn btn-primary me-2" onClick={addTodo} id="wd-zustand-add-todo-click">
            Add
          </button>
          <button
            className="btn btn-warning me-2"
            onClick={updateTodo}
            id="wd-zustand-update-todo-click"
          >
            Update
          </button>
          <input
            className="form-control d-inline-block w-50"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </li>
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex align-items-center">
            <button
              className="btn btn-danger btn-sm me-2"
              onClick={() => deleteTodo(todo.id)}
              id="wd-zustand-delete-todo-click"
            >
              Delete
            </button>
            <button
              className="btn btn-secondary btn-sm me-2"
              onClick={() => setTodo(todo)}
              id="wd-zustand-set-todo-click"
            >
              Edit
            </button>
            {todo.title}
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}