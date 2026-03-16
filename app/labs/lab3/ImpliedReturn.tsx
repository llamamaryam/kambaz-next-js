const square = (num: number) => num * num;

export default function ImpliedReturn() {
  return (
    <div>
      <h4>Implied Return</h4>
      <div>5² = {square(5)}</div>
    </div>
  );
}