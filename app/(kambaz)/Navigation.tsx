"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import type { IconType } from "react-icons";

type NavLink = {
  label: string;
  path: string;
  icon: IconType;
};

export default function KambazNavigation() {
  const pathname = usePathname();
  const links: NavLink[] = [
    { label: "Dashboard", path: "/dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/inbox", icon: FaInbox },
    { label: "Labs", path: "/labs", icon: LiaCogSolid },
  ];

  const isActive = (label: string, path: string) => {
    if (label === "Courses") {
      return pathname.startsWith("/courses");
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <a
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0 text-center"
        rel="noreferrer"
      >
        <img src="/images/NEU.png" width="75px" />
      </a>
      <Link
        href="/account"
        className={`list-group-item text-center border-0 ${pathname.startsWith("/account") ? "bg-white text-danger" : "bg-black text-white"}`}
      >
        <FaRegCircleUser className={`fs-1 ${pathname.startsWith("/account") ? "text-danger" : "text-white"}`} />
        <br />
        Account
      </Link>
      {links.map((link) => {
        const Icon = link.icon;
        const active = isActive(link.label, link.path);
        return (
          <Link
            key={link.label}
            href={link.path}
            className={`list-group-item text-center border-0 ${active ? "bg-white text-danger" : "bg-black text-white"}`}
          >
            <Icon className="fs-1 text-danger" />
            <br />
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}