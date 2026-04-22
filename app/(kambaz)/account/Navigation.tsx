"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const links = currentUser ? ["profile"] : ["signin", "signup"];
  const pathname = usePathname();

  return (
    <ul className="nav nav-pills flex-column gap-2" style={{ minWidth: 160 }}>
      {links.map((link) => (
        <li className="nav-item" key={link}>
          <Link
            href={`/account/${link}`}
            className={`nav-link ${pathname.endsWith(link) ? "active" : ""}`}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </Link>
        </li>
      ))}
      {currentUser && currentUser.role === "ADMIN" && (
        <li className="nav-item">
          <Link
            href="/account/users"
            className={`nav-link ${pathname.endsWith("users") ? "active" : ""}`}
          >
            Users
          </Link>
        </li>
      )}
    </ul>
  );
}