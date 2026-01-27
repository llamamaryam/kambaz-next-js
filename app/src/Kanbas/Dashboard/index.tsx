"use client";
import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        
        <div className="wd-dashboard-course">
          <img src="/images/cybertruck.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course"> 
          <img src="/images/picopark.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/101/Home">
              CO101 Co Operation
            </Link>
            <p className="wd-dashboard-course-title">
              Meditation and Team Building
            </p>
            <Link to="/Kanbas/Courses/101/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/switch.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/313/Home">
              GM313 Gaming
            </Link>
            <p className="wd-dashboard-course-title">
              Introduction to gaming
            </p>
            <Link to="/Kanbas/Courses/313/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/pumpkincarving.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/237/Home">
              HW237 Pumpkin Carving
            </Link>
            <p className="wd-dashboard-course-title">
              Introduction the art of carving pumpkins
            </p>
            <Link to="/Kanbas/Courses/237/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/rubberducky.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/715/Home">
              DK715 Rubber Duck
            </Link>
            <p className="wd-dashboard-course-title">
              Exploring what is the function of a rubber duck
            </p>
            <Link to="/Kanbas/Courses/715/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/electricalengineering.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/2520/Home">
              EECE2520 Linear Systems 
            </Link>
            <p className="wd-dashboard-course-title">
              Fundamentals of Linear Systems
            </p>
            <Link to="/Kanbas/Courses/2520/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/graphicdesigner.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1001/Home">
              ARTG1001 Design Perspectives
            </Link>
            <p className="wd-dashboard-course-title">
              Introduction to design in the world
            </p>
            <Link to="/Kanbas/Courses/1001/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/switch.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/3300/Home">
              CS3300 Programming Languages
            </Link>
            <p className="wd-dashboard-course-title">
              Methodology and implementation of programming languages using racket
            </p>
            <Link to="/Kanbas/Courses/3300/Home"> Go </Link>
          </div>
        </div>

      </div>
    </div>
  );
}