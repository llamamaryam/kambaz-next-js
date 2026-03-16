"use client";
import { useState } from "react";

export default function AddingAndRemovingToFromArrays() {
  const [numbers, setNumbers] = useState([1, 2, 3]);

  return (
    <div>
      <h4>Adding and Removing To/From Arrays</h4>
      <div>{numbers.join(", ")}</div>
      <button className="btn btn-primary btn-sm me-2" onClick={() => setNumbers([...numbers, numbers.length + 1])}>
        Add
      </button>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => setNumbers(numbers.slice(0, -1))}
        disabled={numbers.length === 0}
      >
        Remove
      </button>
    </div>
  );
}