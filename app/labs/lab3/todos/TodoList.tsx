import todos from "./todos.json";
import TodoItem from "./TodoItem";

export default function TodoList() {
  return (
    <div>
      <h4>Todo Application</h4>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}