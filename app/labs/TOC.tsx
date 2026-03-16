"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();
  const isLabsActive = pathname === "/labs";
  const isLab1Active = pathname === "/labs/lab1" || pathname.startsWith("/labs/lab1/");
  const isLab2Active = pathname === "/labs/lab2" || pathname.startsWith("/labs/lab2/");
  const isLab3Active = pathname === "/labs/lab3" || pathname.startsWith("/labs/lab3/");
  const isLab4Active = pathname === "/labs/lab4" || pathname.startsWith("/labs/lab4/");

  return (
    <ul className="nav nav-pills mb-3">
      <li className="nav-item">
        <Link href="/labs" className={`nav-link ${isLabsActive ? "active" : ""}`}>
          Labs
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/labs/lab1" className={`nav-link ${isLab1Active ? "active" : ""}`}>
          Lab 1
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/labs/lab2" className={`nav-link ${isLab2Active ? "active" : ""}`}>
          Lab 2
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/labs/lab3" className={`nav-link ${isLab3Active ? "active" : ""}`}>
          Lab 3
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/labs/lab4" className={`nav-link ${isLab4Active ? "active" : ""}`}>
          Lab 4
        </Link>
      </li>
    </ul>
  );
}