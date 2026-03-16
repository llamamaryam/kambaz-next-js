export default function IfElse() {
  const loggedIn = false;
  let message = "";

  if (loggedIn) {
    message = "Welcome back";
  } else {
    message = "Please sign in";
  }

  return (
    <div>
      <h4>If Else</h4>
      <div>{message}</div>
    </div>
  );
}