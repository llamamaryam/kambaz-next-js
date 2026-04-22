import { randomUUID } from "crypto";
import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js";

export default function CoursesDao(db) {
  const findAllCourses = () => model.find({}, { name: 1, description: 1 });

  const findCourseById = (courseId) => model.findById(courseId);

  const findCoursesForEnrolledUser = async (userId) => {
    const enrollments = await enrollmentModel.find({ user: userId }, { course: 1 });
    const enrolledCourseIds = new Set(enrollments.map((enrollment) => enrollment.course));
    const courses = await model.find({}, { name: 1, description: 1 });
    return courses.filter((course) => enrolledCourseIds.has(course._id));
  };

  const createCourse = (course) => {
    const { _id, ...courseWithoutId } = course;
    const newCourse = { ...courseWithoutId, _id: _id || randomUUID() };
    return model.create(newCourse);
  };

  const updateCourse = (courseId, courseUpdates) =>
    model.updateOne({ _id: courseId }, { $set: courseUpdates });

  const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });

  return {
    findAllCourses,
    findCourseById,
    findCoursesForEnrolledUser,
    createCourse,
    updateCourse,
    deleteCourse,
  };
}
