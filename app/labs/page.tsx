import TOC from "./TOC";
import Lab3 from "./lab3/page";

export default function LabsPage() {
  return (
    <div className="p-3">
      <h2>Labs</h2>
      <TOC />
      <Lab3 />
    </div>
  );
}