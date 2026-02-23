export default function StyleDemo() {
  const danger = true;
  const blue = false;
  return (
    <div>
      <h2>Working with Styles</h2>
      <div className={danger ? "bg-danger text-white" : ""}>
        Red dangerous background
      </div>
      <div className={blue ? "bg-primary text-white" : ""}>
        Blue dynamic blue background
      </div>
      <div style={{ backgroundColor: "yellow" }}>Yellow background (inline style)</div>
      <div style={{ backgroundColor: "red", color: "white" }}>Red background (inline style)</div>
      <div style={{ backgroundColor: "blue", color: "white" }}>Blue background (inline style)</div>
    </div>
  );
}
