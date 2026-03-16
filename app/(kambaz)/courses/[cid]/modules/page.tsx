"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import * as db from "@/app/(kambaz)/database";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";

export default function ModulesPage() {
  const { cid } = useParams<{ cid: string }>();
  const [modules, setModules] = useState<any[]>(db.modules);
  const [moduleName, setModuleName] = useState("");

  const addModule = () => {
    if (!moduleName.trim()) return;
    setModules([...modules, { _id: uuidv4(), name: moduleName, course: cid, lessons: [] }]);
    setModuleName("");
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m._id !== moduleId));
  };

  const editModule = (moduleId: string) => {
    setModules(modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)));
  };

  const updateModule = (module: any) => {
    setModules(modules.map((m) => (m._id === module._id ? module : m)));
  };

  const courseModules = modules.filter((module) => module.course === cid);

  return (
    <div className="wd-modules">
      <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={addModule} />
      <h3>Modules</h3>
      <ul className="list-group rounded-0">
        {courseModules.map((module) => (
          <li key={module._id} className="list-group-item p-0 mb-4 fs-5 border-gray">
            <div className="p-3 ps-2 bg-secondary">
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={deleteModule}
                editModule={editModule}
              />
              {!module.editing && <b>{module.name}</b>}
              {module.editing && (
                <input
                  className="form-control w-50 d-inline-block"
                  onChange={(e) => updateModule({ ...module, name: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name}
                />
              )}
            </div>
            <ul className="list-group rounded-0">
              {module.lessons.map((lesson) => (
                <li key={lesson._id} className="list-group-item p-3 ps-1">
                  {lesson.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}