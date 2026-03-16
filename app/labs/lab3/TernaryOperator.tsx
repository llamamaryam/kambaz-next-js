export default function TernaryOperator() {
  const passing = true;

  return (
    <div>
      <h4>Ternary Operator</h4>
      <div>Status: {passing ? "Pass" : "Fail"}</div>
    </div>
  );
}