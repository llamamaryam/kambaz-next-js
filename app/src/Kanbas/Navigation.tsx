"use client";
import { Link, useLocation } from "react-router-dom";
import { navigationLinks } from "./data";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
export default function KanbasNavigation() {
  const location = useLocation();
  return (
    <div id="wd-kanbas-navigation" style={{ width: 110 }}
      className="list-group rounded-0 position-fixed
      bottom-0 top-0 d-none d-md-block bg-black z-2">
      <a href="https://www.northeastern.edu/" 
        id="wd-neu-link" target="_blank"
        className="list-group-item bg-black border-0 text-center">
        <img src="/images/NEU.png" width="75px" /></a>

      {navigationLinks.map(link => (
        <Link
          key={link.path}
          to={link.path}
          className={`list-group-item text-center border-0 ${location.pathname.startsWith(link.path) ? "bg-white text-danger" : "bg-black text-white"}`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}