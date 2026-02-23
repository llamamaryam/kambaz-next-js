import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

// Legacy ES5 function
function addES5(a: number, b: number) {
  return a + b;
}
// ES6 arrow function
const addES6 = (a: number, b: number) => a + b;
// Implied return
const addImplied = (a: number, b: number) => a + b;
// Function destructuring
function sum([a, b]: [number, number]) { return a + b; }

function ChildComponent({ message }: { message: string }) {
  return <div>Child says: {message}</div>;
}

export default function Lab3Demo() {
  // Variable types
  const str = "Hello";
  const num = 42;
  const bool = true;
  const arr = [1, 2, 3];
  const obj = { name: "Alice", age: 25 };

  // Boolean variables, If Else, Ternary
  const isLoggedIn = false;
  let welcomeMsg;
  if (isLoggedIn) {
    welcomeMsg = "Welcome!";
  } else {
    welcomeMsg = "Please log in.";
  }
  const ternaryMsg = isLoggedIn ? "Logged in" : "Not logged in";

  // Generating conditional output
  const showSecret = isLoggedIn && <div>Secret Info</div>;

  // Template literals
  const greeting = `Hi, ${obj.name}!`;

  // Arrays, index, length, add/remove
  const [numbers, setNumbers] = useState([1, 2, 3]);
  const addNumber = () => setNumbers([...numbers, numbers.length + 1]);
  const removeNumber = () => setNumbers(numbers.slice(0, -1));

  // Map, Find, FindIndex, Filter
  const doubled = numbers.map(n => n * 2);
  const found = numbers.find(n => n === 2);
  const foundIdx = numbers.findIndex(n => n === 2);
  const filtered = numbers.filter(n => n % 2 === 1);

  // JSON
  const json = JSON.stringify(obj);

  // ToDo List
  const [todos, setTodos] = useState(["Learn React", "Build a ToDo List"]);
  const [todoInput, setTodoInput] = useState("");
  const addTodo = () => {
    if (todoInput.trim()) {
      setTodos([...todos, todoInput]);
      setTodoInput("");
    }
  };
  const removeTodo = (idx: number) => setTodos(todos.filter((_, i) => i !== idx));

  // Spread, Destructuring
  const arr1 = [1, 2];
  const arr2 = [3, 4];
  const combined = [...arr1, ...arr2];
  const [first, ...rest] = combined;
  const { name, ...restObj } = obj;

  // HTML classes/styles
  const danger = true;
  const blue = false;

  // Pathname, navigation highlight
  const location = useLocation();

  // Encoding path params
  const encoded = encodeURIComponent("/Kanbas/Courses/1234/Home");

  return (
    <div style={{ padding: 24 }}>
      <h1>Lab 3: JavaScript & React Concepts</h1>
      <h2>Variable Types</h2>
      <div>String: {str}</div>
      <div>Number: {num}</div>
      <div>Boolean: {bool.toString()}</div>
      <div>Array: {arr.join(", ")}</div>
      <div>Object: {JSON.stringify(obj)}</div>

      <h2>Boolean Variables, If Else, Ternary</h2>
      <div>If/Else: {welcomeMsg}</div>
      <div>Ternary: {ternaryMsg}</div>
      <div>Conditional Output: {showSecret}</div>
      <div>Welcome If Else: {isLoggedIn ? "Welcome!" : "Please login (Inline)"}</div>

      <h2>Functions</h2>
      <div>Legacy ES5: 1 + 2 = {addES5(1, 2)}</div>
      <div>ES6 Arrow: 3 + 4 = {addES6(3, 4)}</div>
      <div>Implied Return: 5 + 6 = {addImplied(5, 6)}</div>
      <div>Function Destructuring: [7, 8] = {sum([7, 8])}</div>

      <h2>Template Literals</h2>
      <div>{greeting}</div>

      <h2>Working with Arrays</h2>
      <div>Numbers: {numbers.join(", ")}</div>
      <div>Length: {numbers.length}</div>
      <div>Index 1: {numbers[1]}</div>
      <button onClick={addNumber}>Add Number</button>
      <button onClick={removeNumber} disabled={numbers.length === 0}>Remove Number</button>

      <h2>Array Helpers</h2>
      <div>Doubled: {doubled.join(", ")}</div>
      <div>Find 2: {found}</div>
      <div>Find Index 2: {foundIdx}</div>
      <div>Filter Odd: {filtered.join(", ")}</div>

      <h2>JSON</h2>
      <div>{json}</div>

      <h2>ToDo List</h2>
      <input value={todoInput} onChange={e => setTodoInput(e.target.value)} placeholder="Add todo" />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>{todo} <button onClick={() => removeTodo(idx)}>Delete</button></li>
        ))}
      </ul>

      <h2>Spread & Destructuring</h2>
      <div>Combined: {combined.join(", ")}</div>
      <div>First: {first}</div>
      <div>Rest: {rest.join(", ")}</div>
      <div>Name: {name}</div>
      <div>Rest of Object: {JSON.stringify(restObj)}</div>

      <h2>HTML Classes & Styles</h2>
      <div className={danger ? "bg-danger text-white" : ""}>Red dangerous background</div>
      <div className={blue ? "bg-primary text-white" : ""}>Blue dynamic blue background</div>
      <div style={{ backgroundColor: "yellow" }}>Yellow background (inline style)</div>
      <div style={{ backgroundColor: "red", color: "white" }}>Red background (inline style)</div>
      <div style={{ backgroundColor: "blue", color: "white" }}>Blue background (inline style)</div>

      <h2>Parameterizing & Child Components</h2>
      <ChildComponent message="Hello from parent!" />

      <h2>Working with Pathname</h2>
      <div>Current Path: {location.pathname}</div>
      <div>Navigation highlight: <Link to={location.pathname} className="active">Current Page</Link></div>

      <h2>Encoding Path Parameters</h2>
      <div>Encoded: {encoded}</div>

      <h2>Math Examples</h2>
      <div>1 + 2 = {1 + 2}</div>
      <div>3 + 4 = {3 + 4}</div>
    </div>
  );
}
