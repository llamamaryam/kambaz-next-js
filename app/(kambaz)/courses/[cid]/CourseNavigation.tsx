"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  "Home",
  "Modules",
  "Piazza",
  "Zoom",
  "Assignments",
  "Quizzes",
  "Grades",
  "People",
];

export default function CourseNavigation({ cid }: { cid: string }) {
  const pathname = usePathname();

  return (
    <div id="wd-course-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => {
        const href = `/courses/${cid}/${link.toLowerCase()}`;
        const isActive = pathname === href;
        return (
          <Link
            key={link}
            href={href}
            className={`list-group-item border-0 ${
              isActive
                ? "text-danger border-start border-danger border-3 active bg-white"
                : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
