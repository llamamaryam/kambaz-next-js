function fullName({ firstName, lastName }: { firstName: string; lastName: string }) {
  return `${firstName} ${lastName}`;
}

export default function FunctionDestructing() {
  return (
    <div>
      <h4>Function Destructing</h4>
      <div>{fullName({ firstName: "Alan", lastName: "Turing" })}</div>
    </div>
  );
}