"use client";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { useParams } from "react-router";
import { modules } from "../../data";

export default function Modules() {
  const { cid } = useParams();
  const courseModules = modules.filter((module) => module.course === cid);

  return (
    <div id="wd-modules">
      <ModulesControls /> <br /> <br />
      <ul className="list-group rounded-0">
        {courseModules.map((module) => (
          <li key={module.id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              <IoMdArrowDropdown className="me-2 fs-3" />
              <b>{module.name}</b>
              <ModuleControlButtons />
            </div>
            <ul className="wd-lessons list-group rounded-0">
              {module.lessons.map((lesson) => (
                <li key={lesson} className="wd-lesson list-group-item p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" />
                  <b>{lesson}</b>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}