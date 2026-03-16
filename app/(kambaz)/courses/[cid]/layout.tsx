import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import { courses } from "../../database";
import CourseNavigation from "./CourseNavigation";
import Breadcrumb from "./Breadcrumb";

type CourseLayoutProps = {
  children: ReactNode;
  params: Promise<{
    cid: string;
  }>;
};

export default async function CoursesLayout({ children, params }: CourseLayoutProps) {
  const { cid } = await params;
  const course = courses.find((c) => c._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        <div style={{ minWidth: 200 }}>
          <CourseNavigation cid={cid} />
        </div>
        <div className="flex-fill p-3">
          {children}
        </div>
      </div>
    </div>
  );
}