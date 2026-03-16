export default function VariablesAndConstants() {
  let counter = 1;
  const course = "CS4550";
  counter += 1;

  return (
    <div>
      <h4>Variables and Constants</h4>
      <div>let counter: {counter}</div>
      <div>const course: {course}</div>
    </div>
  );
}