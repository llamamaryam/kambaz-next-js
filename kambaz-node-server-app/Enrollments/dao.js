import model from "./model.js";

export default function EnrollmentsDao(db) {
  const findCoursesForUser = async (userId) => {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  };

  const findUsersForCourse = async (courseId) => {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  };

  const findEnrollmentsForUser = (userId) => model.find({ user: userId });

  const findEnrollmentsForCourse = (courseId) => model.find({ course: courseId });

  const enrollUserInCourse = (userId, courseId) =>
    model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });

  const unenrollUserFromCourse = (user, course) => model.deleteOne({ user, course });

  const unenrollAllUsersFromCourse = (courseId) => model.deleteMany({ course: courseId });

  return {
    findCoursesForUser,
    findUsersForCourse,
    findEnrollmentsForUser,
    findEnrollmentsForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}
