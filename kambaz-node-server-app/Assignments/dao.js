import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao() {
  const findAssignmentsForCourse = (courseId) => model.find({ course: courseId });

  const findAssignmentById = (assignmentId) => model.findById(assignmentId);

  const createAssignment = (courseId, assignment) => {
    const { _id, ...assignmentWithoutId } = assignment;
    return model.create({
      ...assignmentWithoutId,
      _id: _id || uuidv4(),
      course: courseId,
    });
  };

  const updateAssignment = async (assignmentId, assignmentUpdates) => {
    await model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
    return findAssignmentById(assignmentId);
  };

  const deleteAssignment = (assignmentId) => model.deleteOne({ _id: assignmentId });

  const deleteAssignmentsForCourse = (courseId) => model.deleteMany({ course: courseId });

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    deleteAssignmentsForCourse,
  };
}
