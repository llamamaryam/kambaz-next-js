function add(a: number, b: number) {
  return a + b;
}

export default function LegacyFunctions() {
  return (
    <div>
      <h4>Legacy Functions</h4>
      <div>2 + 3 = {add(2, 3)}</div>
    </div>
  );
}