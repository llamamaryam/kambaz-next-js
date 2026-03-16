export default function ConditionalOutputInline() {
  const showMessage = true;

  return (
    <div>
      <h4>Conditional Output Inline</h4>
      {showMessage && <div>Inline condition rendered this message.</div>}
    </div>
  );
}