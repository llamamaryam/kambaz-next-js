const multiply = (a: number, b: number) => a * b;

export default function ArrowFunctions() {
  return (
    <div>
      <h4>Arrow Functions</h4>
      <div>3 * 4 = {multiply(3, 4)}</div>
    </div>
  );
}