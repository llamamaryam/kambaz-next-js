"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import {
  editModule as editModuleAction,
  setModules,
  updateModule as updateModuleAction,
} from "./reducer";
import { RootState } from "../../../store";
import * as client from "../../client";

export default function ModulesPage() {
  const { cid } = useParams<{ cid: string }>();
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();
  const [moduleName, setModuleName] = useState("");
  const [actionError, setActionError] = useState("");

  const fetchModules = async () => {
    try {
      const modules = await client.findModulesForCourse(cid as string);
      dispatch(setModules(modules));
    } catch {
      setActionError("Unable to load modules right now.");
    }
  };

  useEffect(() => {
    dispatch(setModules([]));
    fetchModules();
  }, [cid]);

  const onCreateModuleForCourse = async () => {
    if (!cid || !moduleName.trim()) return;
    try {
      setActionError("");
      const newModule = { name: moduleName.trim(), course: cid };
      const module = await client.createModuleForCourse(cid, newModule);
      dispatch(setModules([...modules, { ...module, lessons: module.lessons || [] }]));
      setModuleName("");
    } catch {
      setActionError("Unable to create module right now.");
    }
  };

  const onRemoveModule = async (moduleId: string) => {
    try {
      setActionError("");
      await client.deleteModule(cid, moduleId);
      dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
    } catch {
      setActionError("Unable to delete module right now.");
    }
  };

  const editModule = (moduleId: string) => {
    dispatch(editModuleAction(moduleId));
  };

  const updateModule = (module: any) => {
    dispatch(updateModuleAction(module));
  };

  const onUpdateModule = async (module: any) => {
    try {
      setActionError("");
      await client.updateModule(cid, module);
      const newModules = modules.map((m: any) => (m._id === module._id ? module : m));
      dispatch(setModules(newModules));
    } catch {
      setActionError("Unable to update module right now.");
    }
  };

  return (
    <div className="wd-modules">
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={onCreateModuleForCourse}
      />
      {actionError && <div className="alert alert-warning py-2">{actionError}</div>}
      <h3>Modules</h3>
      <ul className="list-group rounded-0">
        {modules.map((module) => (
          <li key={module._id} className="list-group-item p-0 mb-4 fs-5 border-gray">
            <div className="p-3 ps-2 bg-secondary">
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={(moduleId) => onRemoveModule(moduleId)}
                editModule={editModule}
              />
              {!module.editing && <b>{module.name}</b>}
              {module.editing && (
                <input
                  className="form-control w-50 d-inline-block"
                  onChange={(e) => updateModule({ ...module, name: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onUpdateModule({ ...module, editing: false });
                    }
                  }}
                  value={module.name}
                />
              )}
            </div>
            <ul className="list-group rounded-0">
              {(module.lessons || []).map((lesson: any) => (
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