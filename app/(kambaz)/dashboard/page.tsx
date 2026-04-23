"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";
import * as client from "../courses/client";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [actionError, setActionError] = useState("");
  const [busyAction, setBusyAction] = useState<"add" | "update" | "enroll" | "unenroll" | "delete" | null>(null);
  const [busyCourseId, setBusyCourseId] = useState<string | null>(null);
  const [course, setCourse] = useState<any>({
    _id: "",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const userEnrollments = enrollments.filter(
    (enrollment: any) => enrollment.user === currentUser?._id,
  );

  const isEnrolled = (courseId: string) =>
    userEnrollments.some((enrollment: any) => enrollment.course === courseId);

  const fetchCourses = async () => {
    try {
      const allCourses = await client.fetchAllCourses();
      dispatch(setCourses(allCourses));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);

  const onAddNewCourse = async () => {
    if (!currentUser) {
      setActionError("Please sign in to add a course.");
      return;
    }
    try {
      setActionError("");
      setBusyAction("add");
      const newCourse = await client.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
      setCourse({
        _id: "",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setActionError("Your session expired. Please sign in again.");
        return;
      }
      setActionError("Unable to add course right now.");
    } finally {
      setBusyAction(null);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      setActionError("");
      setBusyAction("delete");
      setBusyCourseId(courseId);
      await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((course: any) => course._id !== courseId)));
    } catch {
      setActionError("Unable to delete course right now.");
    } finally {
      setBusyAction(null);
      setBusyCourseId(null);
    }
  };

  const onUpdateCourse = async () => {
    if (!course._id) {
      setActionError("Select Edit on a course before updating.");
      return;
    }
    try {
      setActionError("");
      setBusyAction("update");
      await client.updateCourse(course);
      dispatch(
        setCourses(
          courses.map((c: any) => {
            if (c._id === course._id) {
              return course;
            }
            return c;
          }),
        ),
      );
    } catch {
      setActionError("Unable to update course right now.");
    } finally {
      setBusyAction(null);
    }
  };

  const onEnrollInCourse = async (courseId: string) => {
    if (!currentUser) {
      setActionError("Please sign in to enroll.");
      return;
    }
    try {
      setActionError("");
      setBusyAction("enroll");
      setBusyCourseId(courseId);
      await client.enrollIntoCourse(currentUser._id, courseId);
      dispatch(enroll({ user: currentUser._id, course: courseId }));
    } catch {
      setActionError("Unable to enroll right now.");
    } finally {
      setBusyAction(null);
      setBusyCourseId(null);
    }
  };

  const onUnenrollFromCourse = async (courseId: string) => {
    if (!currentUser) {
      setActionError("Please sign in to unenroll.");
      return;
    }
    try {
      setActionError("");
      setBusyAction("unenroll");
      setBusyCourseId(courseId);
      await client.unenrollFromCourse(currentUser._id, courseId);
      dispatch(unenroll({ user: currentUser._id, course: courseId }));
    } catch {
      setActionError("Unable to unenroll right now.");
    } finally {
      setBusyAction(null);
      setBusyCourseId(null);
    }
  };

  const visibleCourses = showAllCourses
    ? courses
    : courses.filter((c: any) => isEnrolled(c._id));

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end me-2"
          id="wd-dashboard-toggle-enrollments"
          disabled={busyAction !== null}
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          Enrollments
        </button>
        <button
          className="btn btn-secondary float-end me-2"
          onClick={onUpdateCourse}
          id="wd-update-course-click"
          disabled={busyAction !== null}
        >
          {busyAction === "update" ? "Updating..." : "Update"}
        </button>
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={onAddNewCourse}
          disabled={busyAction !== null}
        >
          {busyAction === "add" ? "Adding..." : "Add"}
        </button>
      </h5>
      <br />
      <input
        className="form-control mb-2"
        value={course.name}
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <textarea
        className="form-control"
        rows={3}
        value={course.description}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      {actionError && <div className="alert alert-warning mt-3 mb-0">{actionError}</div>}
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {visibleCourses.map((course: any) => (
            <div
              key={course._id}
              className="col"
              style={{ width: "300px" }}
            >
              <div className="card h-100">
                <Link
                  href={`/courses/${course._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={(event) => {
                    if (!isEnrolled(course._id)) {
                      event.preventDefault();
                    }
                  }}
                >
                  <Image
                    src={course.image || "/images/react.jpg"}
                    className="card-img-top"
                    alt={course.name}
                    width={300}
                    height={160}
                    style={{ objectFit: "cover", width: "100%" }}
                  />
                </Link>
                <div className="card-body">
                  <Link
                    href={`/courses/${course._id}/home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(event) => {
                      if (!isEnrolled(course._id)) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <h5
                      className="card-title text-nowrap overflow-hidden"
                      style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {course.name}
                    </h5>
                    <p
                      className="card-text overflow-hidden"
                      style={{ height: "100px", overflow: "hidden" }}
                    >
                      {course.description}
                    </p>
                  </Link>
                  <Link
                    href={`/courses/${course._id}/home`}
                    className="btn btn-primary"
                    onClick={(event) => {
                      if (!isEnrolled(course._id)) {
                        event.preventDefault();
                      }
                    }}
                  >
                    Go
                  </Link>
                  {isEnrolled(course._id) ? (
                    <button
                      className="btn btn-danger me-2 float-end"
                      id="wd-unenroll-course-click"
                      disabled={busyAction !== null}
                      onClick={() => onUnenrollFromCourse(course._id)}
                    >
                      {busyAction === "unenroll" && busyCourseId === course._id ? "Unenrolling..." : "Unenroll"}
                    </button>
                  ) : (
                    <button
                      className="btn btn-success me-2 float-end"
                      id="wd-enroll-course-click"
                      disabled={busyAction !== null}
                      onClick={() => onEnrollInCourse(course._id)}
                    >
                      {busyAction === "enroll" && busyCourseId === course._id ? "Enrolling..." : "Enroll"}
                    </button>
                  )}
                  <button
                    id="wd-edit-course-click"
                    disabled={busyAction !== null}
                    onClick={() => {
                      setActionError("");
                      setCourse(course);
                    }}
                    className="btn btn-warning me-2 float-end"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteCourse(course._id)}
                    className="btn btn-danger float-end"
                    id="wd-delete-course-click"
                    disabled={busyAction !== null}
                  >
                    {busyAction === "delete" && busyCourseId === course._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}