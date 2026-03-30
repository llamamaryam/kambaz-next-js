"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment, setAssignments } from "./reducer";
import { RootState } from "../../../store";
import * as client from "./client";

export default function AssignmentsPage() {
  const { cid } = useParams<{ cid: string }>();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const dispatch = useDispatch();

  const courseAssignments = assignments.filter((assignment: any) => assignment.course === cid);

  useEffect(() => {
    const fetchAssignments = async () => {
      const assignments = await client.findAssignmentsForCourse(cid);
      dispatch(setAssignments(assignments));
    };

    fetchAssignments();
  }, [cid, dispatch]);

  const handleDelete = async (assignmentId: string) => {
    const confirmed = window.confirm("Are you sure you want to remove this assignment?");
    if (!confirmed) return;
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Assignments</h3>
        <Link href={`/courses/${cid}/assignments/new`} className="btn btn-danger" id="wd-add-assignment-btn">
          Add Assignment
        </Link>
      </div>
      <ul className="list-group rounded-0">
        {courseAssignments.map((assignment: any) => (
          <li key={assignment._id} className="list-group-item p-3">
            <div className="d-flex justify-content-between align-items-start">
              <Link
                href={`/courses/${cid}/assignments/${assignment._id}`}
                className="text-decoration-none text-dark"
              >
                <b>{assignment.title}</b>
              </Link>
              <button
                className="btn btn-sm btn-danger"
                id="wd-delete-assignment-click"
                onClick={() => handleDelete(assignment._id)}
              >
                Delete
              </button>
            </div>
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
