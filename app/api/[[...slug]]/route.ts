import { NextRequest } from "next/server";
import {
  clearSession,
  ensureEnrollment,
  error,
  getCurrentUser,
  getStore,
  json,
  makeId,
  normalizeUser,
  setSession,
} from "../_lib/store";

const getSlug = (params: { slug?: string[] }) => params.slug ?? [];

const getRequestBody = async (request: NextRequest) => {
  try {
    return await request.json();
  } catch {
    return {};
  }
};

const getCourseUsers = (courseId: string) => {
  const store = getStore();
  const enrolledUserIds = new Set(
    store.enrollments.filter((enrollment) => enrollment.course === courseId).map((enrollment) => enrollment.user),
  );
  return store.users.filter((user) => enrolledUserIds.has(user._id));
};

export async function GET(request: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await context.params;
  const parts = getSlug({ slug });
  const store = getStore();

  if (parts.length === 0) {
    return json({ ok: true });
  }

  if (parts[0] === "courses") {
    if (parts.length === 1) {
      return json(store.courses);
    }
    if (parts.length === 3 && parts[2] === "modules") {
      return json(store.modules.filter((module) => module.course === parts[1]));
    }
    if (parts.length === 3 && parts[2] === "users") {
      return json(getCourseUsers(parts[1]));
    }
    if (parts.length === 3 && parts[2] === "assignments") {
      return json(store.assignments.filter((assignment) => assignment.course === parts[1]));
    }
  }

  if (parts[0] === "assignments" && parts.length === 2) {
    const assignment = store.assignments.find((item) => item._id === parts[1]);
    return assignment ? json(assignment) : error("Assignment not found", 404);
  }

  if (parts[0] === "users" && parts[1] === "current") {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return error("Unauthorized", 401);
    }
    if (parts[2] === "courses") {
      const enrolledIds = new Set(
        store.enrollments.filter((enrollment) => enrollment.user === currentUser._id).map((enrollment) => enrollment.course),
      );
      const authoredIds = new Set(
        store.courses.filter((course) => course.author === currentUser._id).map((course) => course._id),
      );
      const visibleIds = new Set([...enrolledIds, ...authoredIds]);
      return json(store.courses.filter((course) => visibleIds.has(course._id)));
    }
    if (parts[2] === "enrollments") {
      return json(store.enrollments.filter((enrollment) => enrollment.user === currentUser._id));
    }
  }

  return error("Not found", 404);
}

export async function POST(request: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await context.params;
  const parts = getSlug({ slug });
  const store = getStore();
  const body = await getRequestBody(request);

  if (parts[0] === "users" && parts[1] === "signin") {
    const username = body.username ?? "";
    const password = body.password ?? "";
    const user = store.users.find(
      (item) => (item.username === username || item.loginId === username) && item.password === password,
    );
    if (!user) {
      return error("Invalid username or password", 401);
    }
    const response = json(user);
    setSession(response, user._id);
    return response;
  }

  if (parts[0] === "users" && parts[1] === "signup") {
    const username = body.username?.trim();
    const password = body.password?.trim();
    if (!username || !password) {
      return error("Username and password are required", 400);
    }
    const duplicate = store.users.find((user) => user.username === username || user.loginId === username);
    if (duplicate) {
      return error("Username already in use", 409);
    }
    const newUser = normalizeUser({
      _id: makeId("U"),
      firstName: body.firstName ?? username,
      lastName: body.lastName ?? "",
      section: body.section ?? "S101",
      role: body.role ?? "STUDENT",
      lastActivity: body.lastActivity ?? new Date().toISOString().slice(0, 10),
      totalActivity: body.totalActivity ?? "00:00:00",
      ...body,
      username,
      loginId: body.loginId ?? username,
      password,
    });
    store.users.push(newUser);
    const response = json(newUser, 201);
    setSession(response, newUser._id);
    return response;
  }

  if (parts[0] === "users" && parts[1] === "profile") {
    const currentUser = getCurrentUser(request);
    return currentUser ? json(currentUser) : error("Unauthorized", 401);
  }

  if (parts[0] === "users" && parts[1] === "signout") {
    const response = json({ ok: true });
    clearSession(response);
    return response;
  }

  if (parts[0] === "users" && parts[1] === "current" && parts[2] === "courses") {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return error("Unauthorized", 401);
    }
    const newCourse = {
      _id: body._id && body._id !== "0" ? body._id : makeId("RS"),
      name: body.name ?? "New Course",
      number: body.number ?? "New Number",
      startDate: body.startDate ?? "2026-01-12",
      endDate: body.endDate ?? "2026-05-08",
      department: body.department ?? "D123",
      credits: body.credits ?? 3,
      description: body.description ?? "",
      image: body.image ?? "/images/react.jpg",
      author: currentUser._id,
    };
    store.courses.push(newCourse);
    ensureEnrollment(newCourse._id, currentUser._id);
    return json(newCourse, 201);
  }

  if (parts[0] === "users" && parts[1] === "current" && parts[2] === "courses" && parts[4] === "enrollment") {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return error("Unauthorized", 401);
    }
    ensureEnrollment(parts[3], currentUser._id);
    return json({ ok: true }, 201);
  }

  if (parts[0] === "courses" && parts.length === 3 && parts[2] === "modules") {
    const module = {
      _id: body._id ?? makeId("M"),
      course: parts[1],
      name: body.name ?? "New Module",
      lessons: body.lessons ?? [],
      ...body,
    };
    store.modules.push(module);
    return json(module, 201);
  }

  if (parts[0] === "courses" && parts.length === 3 && parts[2] === "assignments") {
    const assignment = {
      _id: body._id ?? makeId("A"),
      course: parts[1],
      title: body.title ?? "New Assignment",
      description: body.description ?? "",
      points: body.points ?? 100,
      due: body.due ?? "",
      availableFrom: body.availableFrom ?? "",
      availableUntil: body.availableUntil ?? "",
      ...body,
    };
    store.assignments.push(assignment);
    return json(assignment, 201);
  }

  if (parts[0] === "courses" && parts.length === 3 && parts[2] === "users") {
    const user = normalizeUser({
      _id: makeId("U"),
      firstName: body.firstName ?? "",
      lastName: body.lastName ?? "",
      loginId: body.loginId ?? body.username ?? "",
      username: body.username ?? body.loginId ?? "",
      password: body.password ?? "password",
      section: body.section ?? "",
      role: body.role ?? "STUDENT",
      lastActivity: body.lastActivity ?? "",
      totalActivity: body.totalActivity ?? "",
      ...body,
    });
    store.users.push(user);
    ensureEnrollment(parts[1], user._id);
    return json(user, 201);
  }

  return error("Not found", 404);
}

export async function PUT(request: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await context.params;
  const parts = getSlug({ slug });
  const store = getStore();
  const body = await getRequestBody(request);

  if (parts[0] === "courses" && parts.length === 2) {
    const index = store.courses.findIndex((course) => course._id === parts[1]);
    if (index < 0) {
      return error("Course not found", 404);
    }
    store.courses[index] = { ...store.courses[index], ...body, _id: parts[1] };
    return json(store.courses[index]);
  }

  if (parts[0] === "modules" && parts.length === 2) {
    const index = store.modules.findIndex((module) => module._id === parts[1]);
    if (index < 0) {
      return error("Module not found", 404);
    }
    store.modules[index] = { ...store.modules[index], ...body, _id: parts[1] };
    return json(store.modules[index]);
  }

  if (parts[0] === "assignments" && parts.length === 2) {
    const index = store.assignments.findIndex((assignment) => assignment._id === parts[1]);
    if (index < 0) {
      return error("Assignment not found", 404);
    }
    store.assignments[index] = { ...store.assignments[index], ...body, _id: parts[1] };
    return json(store.assignments[index]);
  }

  if (parts[0] === "users" && parts.length === 2) {
    const index = store.users.findIndex((user) => user._id === parts[1]);
    if (index < 0) {
      return error("User not found", 404);
    }
    store.users[index] = normalizeUser({ ...store.users[index], ...body, _id: parts[1] });
    return json(store.users[index]);
  }

  return error("Not found", 404);
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await context.params;
  const parts = getSlug({ slug });
  const store = getStore();

  if (parts[0] === "courses" && parts.length === 2) {
    store.courses = store.courses.filter((course) => course._id !== parts[1]);
    store.modules = store.modules.filter((module) => module.course !== parts[1]);
    store.assignments = store.assignments.filter((assignment) => assignment.course !== parts[1]);
    store.enrollments = store.enrollments.filter((enrollment) => enrollment.course !== parts[1]);
    return json({ ok: true });
  }

  if (parts[0] === "modules" && parts.length === 2) {
    store.modules = store.modules.filter((module) => module._id !== parts[1]);
    return json({ ok: true });
  }

  if (parts[0] === "assignments" && parts.length === 2) {
    store.assignments = store.assignments.filter((assignment) => assignment._id !== parts[1]);
    return json({ ok: true });
  }

  if (parts[0] === "users" && parts.length === 2) {
    store.users = store.users.filter((user) => user._id !== parts[1]);
    store.enrollments = store.enrollments.filter((enrollment) => enrollment.user !== parts[1]);
    const response = json({ ok: true });
    const currentUser = getCurrentUser(request);
    if (currentUser?._id === parts[1]) {
      clearSession(response);
    }
    return response;
  }

  if (parts[0] === "users" && parts[1] === "current" && parts[2] === "courses" && parts[4] === "enrollment") {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return error("Unauthorized", 401);
    }
    store.enrollments = store.enrollments.filter(
      (enrollment) => !(enrollment.course === parts[3] && enrollment.user === currentUser._id),
    );
    return json({ ok: true });
  }

  return error("Not found", 404);
}