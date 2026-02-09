"use client";
import { BsGripVertical } from "react-icons/bs";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentHeadControlButtons from "./AssignmentHeadControlButtons";
import { IoMdArrowDropdown } from "react-icons/io";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { GoChecklist } from "react-icons/go";

export default function Assignments() {
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
            <li className="wd-assignment-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="fs-3" />
              <GoChecklist className="fs-3" style={{ color: "green" }} />
              <div>
                <a className="m-0 text-dark decoration-none"
                  href="#/Kanbas/Courses/1234/Assignments/123"><b>A1</b></a>
                <div className="flex-auto">
                  <p className="m-0 text-danger pe-1">Multiple Modules</p>
                  <p className="m-0">| <b>Not available until</b> May 6 at 12:00am |</p>
                </div>
                <p className="m-0"><b>Due</b> May 13 at 11:59pm | 100pt</p>
              </div>
              <div className="ml-auto">
                <LessonControlButtons />
              </div>
            </li>
            <li className="wd-assignment-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="fs-3" />
              <GoChecklist className="fs-3" style={{ color: "green" }} />
              <div>
                <a className="m-0 text-dark decoration-none"
                  href="#/Kanbas/Courses/1234/Assignments/123"><b>A2</b></a>
                <div className="flex-auto">
                  <p className="m-0 text-danger pe-1">Multiple Modules</p>
                  <p className="m-0">| <b>Not available until</b> May 13 at 12:00am |</p>
                </div>
                <p className="m-0"><b>Due</b> May 20 at 11:59pm | 100pt</p>
              </div>
              <div className="ml-auto">
                <LessonControlButtons />
              </div>
            </li>
            <li className="wd-assignment-lesson list-group-item p-3 ps-1">
              <BsGripVertical className="fs-3" />
              <GoChecklist className="fs-3" style={{ color: "green" }} />
              <div>
                <a className="m-0 text-dark decoration-none"
                  href="#/Kanbas/Courses/1234/Assignments/123"><b>A3</b></a>
                <div className="flex-auto">
                  <p className="m-0 text-danger pe-1">Multiple Modules</p>
                  <p className="m-0">| <b>Not available until</b> May 20 at 12:00am |</p>
                </div>
                <p className="m-0"><b>Due</b> May 27 at 11:59pm | 100pt</p>
              </div>
              <div className="ml-auto">
                <LessonControlButtons />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}