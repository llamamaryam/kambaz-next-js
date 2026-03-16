"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();
  const isLabsActive = pathname === "/labs";
  const isLab3Active = pathname === "/labs/lab3" || pathname.startsWith("/labs/lab3/");

  return (
    <ul>
      <li>
        <Link href="/labs" className={isLabsActive ? "active fw-bold text-primary" : ""}>
          Labs
        </Link>
      </li>
      <li>
        <Link href="/labs/lab3" className={isLab3Active ? "active fw-bold text-primary" : ""}>
          Lab 3
        </Link>
      </li>
    </ul>
  );
}