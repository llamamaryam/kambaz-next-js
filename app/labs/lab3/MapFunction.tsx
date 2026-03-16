export default function MapFunction() {
  const numbers = [1, 2, 3, 4];
  const doubles = numbers.map((number) => number * 2);

  return (
    <div>
      <h4>Map Function</h4>
      <div>{doubles.join(", ")}</div>
    </div>
  );
}