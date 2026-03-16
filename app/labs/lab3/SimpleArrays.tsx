export default function SimpleArrays() {
  const numbers = [10, 20, 30];

  return (
    <div>
      <h4>Simple Arrays</h4>
      <div>{numbers.join(", ")}</div>
    </div>
  );
}