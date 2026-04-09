import { NextRequest } from "next/server";
import { error, getStore, json, makeId } from "../../api/_lib/store";

const asNumber = (value: string | null) => Number(value ?? 0);
const asBoolean = (value: string) => value === "true";

const applyOperation = (operation: string, a: number, b: number) => {
  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      return b === 0 ? null : a / b;
    default:
      return null;
  }
};

const getTodo = (id: string) => getStore().lab5.todos.find((todo) => todo.id === id);

export async function GET(request: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await context.params;
  const parts = slug ?? [];
  const store = getStore();

  if (parts.length === 0) {
    return json({ ok: true });
  }

  if (parts[0] === "welcome") {
    return json("Welcome to Lab 5");
  }

  if (["add", "subtract", "multiply", "divide"].includes(parts[0]) && parts.length === 3) {
    const result = applyOperation(parts[0], Number(parts[1]), Number(parts[2]));
    return result === null ? error("Invalid operation", 400) : json(result);
  }

  if (parts[0] === "calculator") {
    const result = applyOperation(
      request.nextUrl.searchParams.get("operation") ?? "",
      asNumber(request.nextUrl.searchParams.get("a")),
      asNumber(request.nextUrl.searchParams.get("b")),
    );
    return result === null ? error("Invalid operation", 400) : json(result);
  }

  if (parts[0] === "assignment") {
    if (parts.length === 1) {
      return json(store.lab5.assignment);
    }
    if (parts[1] === "title" && parts.length === 2) {
      return json(store.lab5.assignment.title);
    }
    if (parts[1] === "title" && parts[2]) {
      store.lab5.assignment.title = decodeURIComponent(parts[2]);
      return json(store.lab5.assignment);
    }
    if (parts[1] === "score" && parts[2]) {
      store.lab5.assignment.score = Number(parts[2]);
      return json(store.lab5.assignment);
    }
    if (parts[1] === "completed" && parts[2]) {
      store.lab5.assignment.completed = asBoolean(parts[2]);
      return json(store.lab5.assignment);
    }
  }

  if (parts[0] === "module") {
    if (parts.length === 1) {
      return json(store.lab5.module);
    }
    if (parts[1] === "name" && parts.length === 2) {
      return json(store.lab5.module.name);
    }
    if (parts[1] === "name" && parts[2]) {
      store.lab5.module.name = decodeURIComponent(parts[2]);
      return json(store.lab5.module);
    }
    if (parts[1] === "description" && parts[2]) {
      store.lab5.module.description = decodeURIComponent(parts[2]);
      return json(store.lab5.module);
    }
  }

  if (parts[0] === "todos") {
    if (parts.length === 1) {
      const completed = request.nextUrl.searchParams.get("completed");
      const todos = completed === null
        ? store.lab5.todos
        : store.lab5.todos.filter((todo) => todo.completed === asBoolean(completed));
      return json(todos);
    }
    if (parts[1] === "create") {
      store.lab5.todos.push({
        id: makeId("T"),
        title: "New Todo",
        description: "",
        due: "",
        completed: false,
      });
      return json(store.lab5.todos);
    }
    if (parts.length === 2) {
      const todo = getTodo(parts[1]);
      return todo ? json(todo) : error("Todo not found", 404);
    }
    if (parts[2] === "delete") {
      store.lab5.todos = store.lab5.todos.filter((todo) => todo.id !== parts[1]);
      return json(store.lab5.todos);
    }
    if (parts[2] === "title" && parts[3]) {
      const todo = getTodo(parts[1]);
      if (!todo) {
        return error("Todo not found", 404);
      }
      todo.title = decodeURIComponent(parts[3]);
      return json(todo);
    }
    if (parts[2] === "description" && parts[3]) {
      const todo = getTodo(parts[1]);
      if (!todo) {
        return error("Todo not found", 404);
      }
      todo.description = decodeURIComponent(parts[3]);
      return json(todo);
    }
    if (parts[2] === "completed" && parts[3]) {
      const todo = getTodo(parts[1]);
      if (!todo) {
        return error("Todo not found", 404);
      }
      todo.completed = asBoolean(parts[3]);
      return json(todo);
    }
  }

  return error("Not found", 404);
}

export async function POST(request: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await context.params;
  const parts = slug ?? [];
  const store = getStore();

  if (parts[0] === "todos" && parts.length === 1) {
    const body = await request.json();
    const newTodo = {
      id: makeId("T"),
      title: body.title ?? "New Todo",
      description: body.description ?? "",
      due: body.due ?? "",
      completed: body.completed ?? false,
    };
    store.lab5.todos.push(newTodo);
    return json(newTodo, 201);
  }

  return error("Not found", 404);
}

export async function PUT(request: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await context.params;
  const parts = slug ?? [];
  const body = await request.json();

  if (parts[0] === "todos" && parts.length === 2) {
    const todo = getTodo(parts[1]);
    if (!todo) {
      return error("Todo not found", 404);
    }
    Object.assign(todo, body, { id: parts[1] });
    return json(todo);
  }

  return error("Not found", 404);
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await context.params;
  const parts = slug ?? [];
  const store = getStore();

  if (parts[0] === "todos" && parts.length === 2) {
    const existing = getTodo(parts[1]);
    if (!existing) {
      return error("Todo not found", 404);
    }
    store.lab5.todos = store.lab5.todos.filter((todo) => todo.id !== parts[1]);
    return json({ ok: true });
  }

  return error("Not found", 404);
}