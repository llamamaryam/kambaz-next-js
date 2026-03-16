"use client";
import { useParams } from "next/navigation";
import * as db from "@/app/(kambaz)/database";

export default function ModulesPage() {
  const params = useParams<{ cid: string }>();
  const modules = db.modules;
  const courseModules = modules.filter((module) => module.course === params.cid);

  return (
    <div>
      <h3>Modules</h3>
      <ul className="list-group rounded-0">
        {courseModules.map((module) => (
          <li key={module._id} className="list-group-item p-0 mb-4 fs-5 border-gray">
            <div className="p-3 ps-2 bg-secondary">
              <b>{module.name}</b>
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