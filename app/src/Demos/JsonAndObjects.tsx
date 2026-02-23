export default function JsonAndObjects() {
  const user = { name: "Alice", age: 25, admin: false };
  const json = JSON.stringify(user);
  return (
    <div>
      <h2>JSON and Objects</h2>
      <div>Name: {user.name}</div>
      <div>Age: {user.age}</div>
      <div>Admin: {user.admin ? "Yes" : "No"}</div>
      <div>JSON: {json}</div>
    </div>
  );
}
