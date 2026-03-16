"use client";

import { useCounterStore } from "./store";

export default function ZustandCounter() {
  const { count, increase, decrease, setCount, reset } = useCounterStore((state) => state);

  return (
    <div className="m-2" id="wd-zustand-counter">
      <h1 className="text-3xl font-semibold leading-10 text-black">Zustand Counter</h1>
      Count: {count}
      <br />
      <button onClick={() => increase(1)} id="wd-zustand-increase-click">
        Increase
      </button>
      <button onClick={() => decrease(1)} id="wd-zustand-decrease-click">
        Decrease
      </button>
      <button onClick={() => setCount(10)} id="wd-zustand-set10-click">
        Set to 10
      </button>
      <button onClick={() => reset()} id="wd-zustand-reset-click">
        Reset
      </button>
    </div>
  );
}