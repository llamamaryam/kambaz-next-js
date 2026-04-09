import coursesSeed from "../../(kambaz)/database/courses.json";
import modulesSeed from "../../(kambaz)/database/modules.json";
import assignmentsSeed from "../../(kambaz)/database/assignments.json";
import usersSeed from "../../(kambaz)/database/users.json";
import enrollmentsSeed from "../../(kambaz)/database/enrollments.json";
import { NextRequest, NextResponse } from "next/server";

type Entity = Record<string, any>;

type KambazStore = {
  courses: Entity[];
  modules: Entity[];
  assignments: Entity[];
  users: Entity[];
  enrollments: Entity[];
  lab5: {
    assignment: Entity;
    module: Entity;
    todos: Entity[];
  };
};

const SESSION_COOKIE = "kambaz-session";

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const withUserDefaults = (user: Entity): Entity => ({
  ...user,
  username: user.username ?? user.loginId ?? "",
  loginId: user.loginId ?? user.username ?? "",
  password: user.password ?? "password",
});

const createStore = (): KambazStore => ({
  courses: clone(coursesSeed),
  modules: clone(modulesSeed),
  assignments: clone(assignmentsSeed),
  users: clone(usersSeed).map(withUserDefaults),
  enrollments: clone(enrollmentsSeed),
  lab5: {
    assignment: {
      id: 1,
      title: "NodeJS Assignment",
      description: "Create a NodeJS server with ExpressJS",
      due: "2021-10-10",
      completed: false,
      score: 0,
    },
    module: {
      id: "m1",
      name: "Introduction to NodeJS",
      description: "Learn how to build servers with Node and Express",
      course: "CS5610",
    },
    todos: [
      {
        id: "1",
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
      },
      {
        id: "2",
        title: "ReactJS Assignment",
        description: "Create a React Application",
        due: "2021-10-09",
        completed: true,
      },
      {
        id: "3",
        title: "MongoDB Assignment",
        description: "Install MongoDB and explore the CLI",
        due: "2021-11-09",
        completed: false,
      },
    ],
  },
});

declare global {
  var __kambazStore: KambazStore | undefined;
}

export const getStore = () => {
  if (!globalThis.__kambazStore) {
    globalThis.__kambazStore = createStore();
  }
  return globalThis.__kambazStore;
};

export const json = (data: unknown, init?: number | ResponseInit) =>
  typeof init === "number" ? NextResponse.json(data, { status: init }) : NextResponse.json(data, init);

export const error = (message: string, status = 400) => json({ message }, status);

export const getCurrentUser = (request: NextRequest) => {
  const userId = request.cookies.get(SESSION_COOKIE)?.value;
  if (!userId) {
    return null;
  }
  return getStore().users.find((user) => user._id === userId) ?? null;
};

export const setSession = (response: NextResponse, userId: string) => {
  response.cookies.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
};

export const clearSession = (response: NextResponse) => {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
};

export const makeId = (prefix: string) => `${prefix}${Math.random().toString(36).slice(2, 8)}`;

export const ensureEnrollment = (courseId: string, userId: string) => {
  const store = getStore();
  const existing = store.enrollments.find(
    (enrollment) => enrollment.course === courseId && enrollment.user === userId,
  );
  if (!existing) {
    store.enrollments.push({ _id: makeId("E"), course: courseId, user: userId });
  }
};

export const normalizeUser = (user: Entity): Entity => withUserDefaults(user);