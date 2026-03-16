"use client";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { BsGripVertical } from "react-icons/bs";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentHeadControlButtons from "./AssignmentHeadControlButtons";
import { IoMdArrowDropdown } from "react-icons/io";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { GoChecklist } from "react-icons/go";
import { assignments } from "../../data";

export default function Assignments() {
  const { cid } = useParams();
  const courseAssignments = assignments.filter((assignment) => assignment.course === cid);

  return (
    <div id="wd-assignments">
      <AssignmentsControls /> <br /> <br />
      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <IoMdArrowDropdown className="me-2 fs-3" />
            <b>ASSIGNMENTS</b>
            <AssignmentHeadControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {courseAssignments.map((assignment) => (
              <li key={assignment.id} className="wd-assignment-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="fs-3" />
                <GoChecklist className="fs-3" style={{ color: "green" }} />
                <div>
                  <Link
                    className="m-0 text-dark decoration-none"
                    to={`/Kanbas/Courses/${cid}/Assignments/${assignment.id}`}
                  >
                    <b>{assignment.title}</b>
                  </Link>
                  <div className="flex-auto">
                    <p className="m-0 text-danger pe-1">Multiple Modules</p>
                    <p className="m-0">| <b>Not available until</b> {assignment.availableFrom} |</p>
                  </div>
                  <p className="m-0"><b>Due</b> {assignment.due} | {assignment.points}pt</p>
                </div>
                <div className="ml-auto">
                  <LessonControlButtons />
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}