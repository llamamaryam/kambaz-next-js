"use client";
import { usePathname } from "next/navigation";

export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();
  const section = pathname.split("/").pop() || "home";
  const sectionLabel = section.charAt(0).toUpperCase() + section.slice(1);

  return (
    <span>
      Course {course?.name} &gt; {sectionLabel}
    </span>
  );
}