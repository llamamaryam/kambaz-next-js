"use client";

import { ReactNode, useEffect, useState } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CourseNavigation from "./CourseNavigation";
import Breadcrumb from "./Breadcrumb";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const [showCourseNavigation, setShowCourseNavigation] = useState(true);
  const course = courses.find((c: any) => c._id === cid);

  const isEnrolled = enrollments.some(
    (enrollment: any) =>
      enrollment.user === currentUser?._id && enrollment.course === cid,
  );

  useEffect(() => {
    if (!currentUser || !isEnrolled) {
      router.replace("/dashboard");
    }
  }, [currentUser, isEnrolled, router]);

  if (!currentUser || !isEnrolled) return null;

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={() => setShowCourseNavigation(!showCourseNavigation)}
        />
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        {showCourseNavigation && (
          <div style={{ minWidth: 200 }}>
            <CourseNavigation cid={cid} />
          </div>
        )}
        <div className="flex-fill p-3">
          {children}
        </div>
      </div>
    </div>
  );
}