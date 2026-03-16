"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "@/app/(kambaz)/database";

export default function AssignmentsPage() {
  const { cid } = useParams<{ cid: string }>();
  const assignments = db.assignments.filter((assignment) => assignment.course === cid);

  return (
    <div id="wd-assignments">
      <h3>Assignments</h3>
      <ul className="list-group rounded-0">
        {assignments.map((assignment) => (
          <li key={assignment._id} className="list-group-item p-3">
            <Link
              href={`/courses/${cid}/assignments/${assignment._id}`}
              className="text-decoration-none text-dark"
            >
              <b>{assignment.title}</b>
            </Link>
            <div className="small mt-1">
              <span className="text-danger">Available:</span> {assignment.availableFrom} - {assignment.availableUntil}
            </div>
            <div className="small">
              <b>Due</b> {assignment.due} | {assignment.points} pts
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
