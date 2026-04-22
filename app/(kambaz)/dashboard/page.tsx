"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  const [course, setCourse] = useState<any>({
    _id: "0",
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
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course: any) => course._id !== courseId)));
  };

  const onUpdateCourse = async () => {
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
  };

  const onEnrollInCourse = async (courseId: string) => {
    if (!currentUser) return;
    await client.enrollIntoCourse(currentUser._id, courseId);
    dispatch(enroll({ user: currentUser._id, course: courseId }));
  };

  const onUnenrollFromCourse = async (courseId: string) => {
    if (!currentUser) return;
    await client.unenrollFromCourse(currentUser._id, courseId);
    dispatch(unenroll({ user: currentUser._id, course: courseId }));
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
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          Enrollments
        </button>
        <button
          className="btn btn-secondary float-end me-2"
          onClick={onUpdateCourse}
          id="wd-update-course-click"
        >
          Update
        </button>
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={onAddNewCourse}
        >
          Add
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
                  <img
                    src={course.image || "/images/react.jpg"}
                    className="card-img-top"
                    alt={course.name}
                    width="100%"
                    height={160}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="card-body">
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
                    <button className="btn btn-primary">Go</button>
                    {isEnrolled(course._id) ? (
                      <button
                        className="btn btn-danger me-2 float-end"
                        id="wd-unenroll-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          onUnenrollFromCourse(course._id);
                        }}
                      >
                        Unenroll
                      </button>
                    ) : (
                      <button
                        className="btn btn-success me-2 float-end"
                        id="wd-enroll-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          onEnrollInCourse(course._id);
                        }}
                      >
                        Enroll
                      </button>
                    )}
                    <button
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        onDeleteCourse(course._id);
                      }}
                      className="btn btn-danger float-end"
                      id="wd-delete-course-click"
                    >
                      Delete
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}