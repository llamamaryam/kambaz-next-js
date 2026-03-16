type Todo = {
  id: number;
  title: string;
  done: boolean;
};

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li>
      {todo.done ? "✅" : "⬜"} {todo.title}
    </li>
  );
}