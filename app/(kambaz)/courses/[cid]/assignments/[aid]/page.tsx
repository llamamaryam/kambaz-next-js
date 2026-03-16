"use client";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateAssignment } from "../reducer";
import { RootState } from "../../../../store";

export default function AssignmentEditorPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const assignment = assignments.find(
    (currentAssignment: any) => currentAssignment.course === cid && currentAssignment._id === aid,
  );

  const [formData, setFormData] = useState<any>(assignment || {});

  useMemo(() => {
    setFormData(assignment || {});
  }, [assignment]);

  if (!assignment) {
    return <div id="wd-assignments-editor">Assignment not found.</div>;
  }

  const save = () => {
    dispatch(
      updateAssignment({
        ...assignment,
        ...formData,
        _id: assignment._id,
        course: assignment.course,
      }),
    );
    router.push(`/courses/${cid}/assignments`);
  };

  const cancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container-fluid p-0">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input
          id="wd-name"
          className="form-control"
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">Description</label>
        <textarea
          id="wd-description"
          className="form-control"
          rows={5}
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <label htmlFor="wd-points" className="form-label">Points</label>
          <input
            id="wd-points"
            className="form-control"
            value={formData.points ?? ""}
            onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label htmlFor="wd-due-date" className="form-label">Due</label>
          <input
            id="wd-due-date"
            className="form-control"
            type="date"
            value={formData.due || ""}
            onChange={(e) => setFormData({ ...formData, due: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="wd-available-from" className="form-label">Available from</label>
          <input
            id="wd-available-from"
            className="form-control"
            type="date"
            value={formData.availableFrom || ""}
            onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="wd-available-until" className="form-label">Until</label>
          <input
            id="wd-available-until"
            className="form-control"
            type="date"
            value={formData.availableUntil || ""}
            onChange={(e) => setFormData({ ...formData, availableUntil: e.target.value })}
          />
        </div>
      </div>

      <div className="d-flex gap-2 justify-content-end">
        <button onClick={cancel} className="btn btn-secondary">Cancel</button>
        <button onClick={save} className="btn btn-danger">Save</button>
      </div>
    </div>
  );
}