"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "@/app/(kambaz)/database";

export default function AssignmentEditorPage() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const assignment = db.assignments.find(
    (currentAssignment) => currentAssignment.course === cid && currentAssignment._id === aid
  );

  if (!assignment) {
    return <div id="wd-assignments-editor">Assignment not found.</div>;
  }

  return (
    <div id="wd-assignments-editor" className="container-fluid p-0">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input id="wd-name" className="form-control" defaultValue={assignment.title} />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">Description</label>
        <textarea
          id="wd-description"
          className="form-control"
          rows={5}
          defaultValue={assignment.description}
        />
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <label htmlFor="wd-points" className="form-label">Points</label>
          <input id="wd-points" className="form-control" defaultValue={assignment.points} />
        </div>
        <div className="col-md-4">
          <label htmlFor="wd-group" className="form-label">Assignment Group</label>
          <select id="wd-group" className="form-select" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
          <select id="wd-display-grade-as" className="form-select" defaultValue="Percentage">
            <option value="Percentage">Percentage</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
        <select id="wd-submission-type" className="form-select" defaultValue="Online">
          <option value="Online">Online</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Online Entry Options</label>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="wd-text-entry" defaultChecked />
          <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="wd-website-url" defaultChecked />
          <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="wd-media-recordings" />
          <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="wd-student-annotation" />
          <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="wd-file-upload" defaultChecked />
          <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
          <input id="wd-assign-to" className="form-control" defaultValue="Everyone" />
        </div>
        <div className="col-md-3">
          <label htmlFor="wd-due-date" className="form-label">Due</label>
          <input id="wd-due-date" className="form-control" type="date" defaultValue={assignment.due} />
        </div>
        <div className="col-md-3">
          <label htmlFor="wd-available-from" className="form-label">Available from</label>
          <input id="wd-available-from" className="form-control" type="date" defaultValue={assignment.availableFrom} />
        </div>
        <div className="col-md-2">
          <label htmlFor="wd-available-until" className="form-label">Until</label>
          <input id="wd-available-until" className="form-control" type="date" defaultValue={assignment.availableUntil} />
        </div>
      </div>

      <div className="d-flex gap-2 justify-content-end">
        <Link href={`/courses/${cid}/assignments`} className="btn btn-secondary">Cancel</Link>
        <Link href={`/courses/${cid}/assignments`} className="btn btn-danger">Save</Link>
      </div>
    </div>
  );
}