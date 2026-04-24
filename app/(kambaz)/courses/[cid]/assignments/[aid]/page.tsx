"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  addAssignment as addAssignmentAction,
  setAssignments,
  updateAssignment as updateAssignmentAction,
} from "../reducer";
import { RootState } from "../../../../store";
import * as client from "../client";

const defaultAssignment = {
  title: "New Assignment",
  description: "",
  points: 100,
  due: "",
  availableFrom: "",
  availableUntil: "",
};

export default function AssignmentEditorPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const existingAssignment = assignments.find(
    (currentAssignment: any) => currentAssignment.course === cid && currentAssignment._id === aid,
  );
  const isNewAssignment = aid === "new";
  const [formData, setFormData] = useState<any>(isNewAssignment ? defaultAssignment : existingAssignment || defaultAssignment);
  const [loading, setLoading] = useState(!isNewAssignment && !existingAssignment);

  useEffect(() => {
    const loadAssignment = async () => {
      if (isNewAssignment) {
        setFormData(defaultAssignment);
        setLoading(false);
        return;
      }
      if (existingAssignment) {
        setFormData(existingAssignment);
        setLoading(false);
        return;
      }
      try {
        const assignment = await client.findAssignmentById(aid);
        setFormData(assignment);
        dispatch(setAssignments([...assignments.filter((currentAssignment: any) => currentAssignment.course !== cid), assignment]));
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    loadAssignment();
  }, [aid, assignments, cid, dispatch, existingAssignment, isNewAssignment]);

  if (!isNewAssignment && !loading && !formData._id) {
    return <div id="wd-assignments-editor">Assignment not found.</div>;
  }

  const save = async () => {
    if (isNewAssignment) {
      const createdAssignment = await client.createAssignment(cid, { ...formData, course: cid });
      dispatch(addAssignmentAction(createdAssignment));
    } else {
      const updatedAssignment = await client.updateAssignment({
        ...formData,
        _id: formData._id,
        course: cid,
      });
      dispatch(updateAssignmentAction(updatedAssignment));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const cancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  if (loading) {
    return <div id="wd-assignments-editor">Loading...</div>;
  }

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