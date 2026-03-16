import Link from "next/link";
import * as db from "../database";

const courseImages = [
  "/images/electricalengineering.jpg",
  "/images/stacked.jpg",
  "/images/racket.jpg",
  "/images/graphicdesigner.jpg",
  "/images/picopark.jpg",
  "/images/switch.jpg",
  "/images/cybertruck.jpg",
  "/images/teslabot.jpg",
];

export default function Dashboard() {
  const courses = db.courses;
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course, index) => (
            <div
              key={course._id}
              className="col"
              style={{ width: "300px" }}
            >
              <div className="card h-100">
                <Link
                  href={`/courses/${course._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <img
                    src={courseImages[index % courseImages.length]}
                    className="card-img-top"
                    alt={course.name}
                    width="100%"
                    height={160}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5
                      className="card-title text-nowrap overflow-hidden"
                      style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {course.name}
                    </h5>
                    <p
                      className="card-text overflow-hidden"
                      style={{ height: "100px", overflow: "hidden" }}
                    >
                      {course.description}
                    </p>
                    <button className="btn btn-primary">Go</button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}