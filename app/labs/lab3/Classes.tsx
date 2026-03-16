"use client";
import "./Classes.css";

export default function Classes() {
  const useDynamic = true;
  const useConditional = true;

  return (
    <div>
      <h4>Classes</h4>
      <div className="lab3-static">Static class styling</div>
      <div className={useDynamic ? "lab3-dynamic" : ""}>Dynamic class styling</div>
      <div className={useConditional ? "lab3-conditional" : ""}>Conditional class styling</div>
    </div>
  );
}