export default function ConditionalOutputIfElse() {
  const hasAccess = true;

  if (hasAccess) {
    return (
      <div>
        <h4>Conditional Output If Else</h4>
        <div>Access granted</div>
      </div>
    );
  }

  return (
    <div>
      <h4>Conditional Output If Else</h4>
      <div>Access denied</div>
    </div>
  );
}