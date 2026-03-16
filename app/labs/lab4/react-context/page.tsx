"use client";

import CounterContext from "./counter";
import { CounterProvider } from "./counter/context";

export default function ReactContextExamples() {
  return (
    <div>
      <h1>React Context Examples</h1>
      <CounterProvider>
        <CounterContext />
      </CounterProvider>
    </div>
  );
}