export default function ArraysAndLoops() {
  const numbers = [1, 2, 3, 4, 5];
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return (
    <div>
      <h2>Arrays and Loops</h2>
      <div>Numbers: {numbers.join(", ")}</div>
      <div>Sum: {sum}</div>
      <div>Array Length: {numbers.length}</div>
      <div>Index 2: {numbers[2]}</div>
    </div>
  );
}
