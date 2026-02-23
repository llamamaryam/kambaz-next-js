export default function BooleansAndConditionals() {
  const isLoggedIn = true;
  let message;
  if (isLoggedIn) {
    message = "Welcome back!";
  } else {
    message = "Please log in.";
  }
  const isAdmin = false;
  return (
    <div>
      <h2>Boolean Variables & Conditionals</h2>
      <div>isLoggedIn: {isLoggedIn.toString()}</div>
      <div>isAdmin: {isAdmin ? "Yes" : "No"}</div>
      <div>Message: {message}</div>
      <div>{isLoggedIn ? "You are logged in." : "You are not logged in."}</div>
    </div>
  );
}
