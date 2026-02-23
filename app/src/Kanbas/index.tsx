"use client";
import "./styles.css";
import { Routes, Route, Navigate } from "react-router";
import Account from "./Account/index";
import Dashboard from "./Dashboard/index";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses/index";

export default function Kanbas() {
    return (
      <div id="wd-kanbas">
        <table>
          <tr>
            <td valign="top">
              <KanbasNavigation />
            </td>
            <td valign="top">
              <div className="wd-main-content-offset">
                <Routes>
                <Route path="/" element={<Navigate to="Account" />} />
                <Route path="/Account/*" element={<Account />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Courses/:cid/*" element={<Courses />} />
                <Route path="/Calendar" element={<h1>Calendar</h1>} />
                <Route path="/Inbox" element={<h1>Inbox</h1>} />
                </Routes>
              </div>
            </td>
          </tr>
        </table>
      </div> 
    );
}