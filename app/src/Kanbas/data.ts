// Demo Kanbas data for navigation, dashboard, courses, modules, assignments, people

export const navigationLinks = [
  { label: "Account", path: "/Kanbas/Account" },
  { label: "Dashboard", path: "/Kanbas/Dashboard" },
  { label: "Courses", path: "/Kanbas/Courses" },
  { label: "Calendar", path: "/Kanbas/Calendar" },
  { label: "Inbox", path: "/Kanbas/Inbox" },
  { label: "Labs", path: "/Labs" },
];

export const courses = [
  { id: "1234", name: "CS4550 Web Development", number: "CS4550", semester: "Spring 2026", color: "#0074D9" },
  { id: "101", name: "CS5610 Web Development Tools", number: "CS5610", semester: "Spring 2026", color: "#FF4136" },
];

export const modules = {
  "1234": [
    { id: "m1", name: "Introduction", lessons: ["What is Web Dev?", "Tools"] },
    { id: "m2", name: "HTML", lessons: ["Tags", "Attributes"] },
  ],
  "101": [
    { id: "m1", name: "Setup", lessons: ["Install Node", "VS Code"] },
  ],
};

export const assignments = {
  "1234": [
    { id: "a1", title: "Assignment 1", due: "2026-03-01" },
    { id: "a2", title: "Assignment 2", due: "2026-03-15" },
  ],
  "101": [
    { id: "a1", title: "HW 1", due: "2026-03-05" },
  ],
};

export const people = {
  "1234": [
    { id: "u1", name: "Alice", role: "Student" },
    { id: "u2", name: "Bob", role: "Instructor" },
  ],
  "101": [
    { id: "u3", name: "Charlie", role: "Student" },
  ],
};
