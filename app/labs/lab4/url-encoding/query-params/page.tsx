import { Suspense } from "react";
import QueryCalculatorContent from "./QueryCalculatorContent";

export default function QueryCalculator() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryCalculatorContent />
    </Suspense>
  );
}