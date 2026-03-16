// Demo Kanbas data for navigation, dashboard, courses, modules, assignments, people

export { courses, modules, assignments } from "./database";

export const navigationLinks = [
  { label: "Account", path: "/Kanbas/Account" },
  { label: "Dashboard", path: "/Kanbas/Dashboard" },
  { label: "Courses", path: "/Kanbas/Courses" },
  { label: "Calendar", path: "/Kanbas/Calendar" },
  { label: "Inbox", path: "/Kanbas/Inbox" },
  { label: "Labs", path: "/Labs" },
];

export const people = {
  "1234": [
    { id: "u1", name: "Alice", role: "Student" },
    { id: "u2", name: "Bob", role: "Instructor" },
  ],
  "101": [
    { id: "u3", name: "Charlie", role: "Student" },
  ],
};
