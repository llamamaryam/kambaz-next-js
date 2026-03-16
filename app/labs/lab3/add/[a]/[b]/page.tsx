"use client";
import { useParams } from "next/navigation";

export default function AddParamsPage() {
  const params = useParams<{ a: string; b: string }>();
  const a = Number.parseFloat(params.a);
  const b = Number.parseFloat(params.b);

  return (
    <div className="p-3">
      <h3>Path Parameters Add</h3>
      <div>
        {a} + {b} = {a + b}
      </div>
    </div>
  );
}