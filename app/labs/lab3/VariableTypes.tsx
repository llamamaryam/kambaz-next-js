export default function VariableTypes() {
  const aString = "Hello";
  const aNumber = 123;
  const aBoolean = true;

  return (
    <div>
      <h4>Variable Types</h4>
      <div>String: {aString}</div>
      <div>Number: {aNumber}</div>
      <div>Boolean: {aBoolean.toString()}</div>
    </div>
  );
}