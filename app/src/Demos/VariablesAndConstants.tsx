export default function VariablesAndConstants() {
  const pi = 3.14;
  let radius = 5;
  const area = pi * radius * radius;
  const name = "Alice";
  return (
    <div>
      <h2>Variables and Constants</h2>
      <div>pi: {pi}</div>
      <div>radius: {radius}</div>
      <div>area: {area}</div>
      <div>name: {name}</div>
    </div>
  );
}
