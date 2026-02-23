"use client";
import CourseNavigation from "./CourseNavigation";
import { Navigate, Route, Routes, useParams } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { courses } from "../data";
export default function Courses() {
    const { cid } = useParams();
    const course = courses.find(c => c.id === cid);
    return (
      <div id="wd-courses">
        <h2>{course ? course.name : `Course ${cid}`}</h2>
        <hr />
        <table>
            <tr>
            <td valign="top">
                <CourseNavigation />
            </td>
            <td valign="top">
                <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home />} />
                <Route path="Modules" element={<Modules />} />
                <Route path="Assignments" element={<Assignments />} />
                <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                <Route path="People" element={<PeopleTable />} />
                </Routes>
            </td>
            </tr>
        </table>
      </div>
  );
}