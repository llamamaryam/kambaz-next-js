import { Link, useParams, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "Home" },
  { label: "Modules", path: "Modules" },
  { label: "Assignments", path: "Assignments" },
  { label: "People", path: "People" },
];

export default function CourseNavigation() {
  const { cid } = useParams();
  const location = useLocation();
  return (
    <div className="list-group">
      {navItems.map(item => (
        <Link
          key={item.path}
          to={`/Kanbas/Courses/${cid}/${item.path}`}
          className={`list-group-item ${location.pathname.endsWith(item.path) ? "active" : ""}`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
