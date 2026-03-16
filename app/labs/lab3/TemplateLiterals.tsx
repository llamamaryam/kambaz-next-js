export default function TemplateLiterals() {
  const firstName = "Ritam";
  const course = "CS4550";
  const message = `Hello ${firstName}, welcome to ${course}`;

  return (
    <div>
      <h4>Template Literals</h4>
      <div>{message}</div>
    </div>
  );
}