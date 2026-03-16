export default function Destructing() {
  const person = { firstName: "Grace", lastName: "Hopper", age: 85 };
  const { firstName, age } = person;

  return (
    <div>
      <h4>Destructing</h4>
      <div>
        {firstName} is {age}
      </div>
    </div>
  );
}