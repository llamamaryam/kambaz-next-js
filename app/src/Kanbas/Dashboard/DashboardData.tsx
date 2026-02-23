import { Link } from "react-router-dom";
import { courses } from "../data";

export default function DashboardData() {
  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ marginBottom: 24 }}>
        <Link to="/Labs" style={{ fontWeight: "bold", fontSize: 18, color: "#0074D9" }}>
          Go to Labs
        </Link>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {courses.map(course => (
          <div key={course.id} style={{ background: course.color, color: "#fff", padding: 16, borderRadius: 8, minWidth: 200 }}>
            <h4>{course.name}</h4>
            <div>{course.number}</div>
            <div>{course.semester}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
