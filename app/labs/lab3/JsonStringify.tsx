export default function JsonStringify() {
  const person = { firstName: "Ada", lastName: "Lovelace" };

  return (
    <div>
      <h4>JSON Stringify</h4>
      <div>{JSON.stringify(person)}</div>
    </div>
  );
}