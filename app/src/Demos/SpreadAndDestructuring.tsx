export default function SpreadAndDestructuring() {
  const arr1 = [1, 2, 3];
  const arr2 = [4, 5];
  const combined = [...arr1, ...arr2];
  const [first, ...rest] = combined;
  const obj = { a: 1, b: 2, c: 3 };
  const { a, ...others } = obj;
  return (
    <div>
      <h2>Spread & Destructuring</h2>
      <div>Combined: {combined.join(", ")}</div>
      <div>First: {first}</div>
      <div>Rest: {rest.join(", ")}</div>
      <div>a: {a}</div>
      <div>Others: {JSON.stringify(others)}</div>
    </div>
  );
}
