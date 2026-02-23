export default function ArrayHelpers() {
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(n => n * 2);
  const even = numbers.filter(n => n % 2 === 0);
  const found = numbers.find(n => n > 3);
  const foundIndex = numbers.findIndex(n => n === 3);
  return (
    <div>
      <h2>Array Helper Functions</h2>
      <div>Doubled: {doubled.join(", ")}</div>
      <div>Even: {even.join(", ")}</div>
      <div>First &gt; 3: {found}</div>
      <div>Index of 3: {foundIndex}</div>
    </div>
  );
}
