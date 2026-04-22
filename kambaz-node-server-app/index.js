import "dotenv/config";
import fs from "fs";
import path from "path";
import cors from "cors";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import CourseRoutes from "./Courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import EnrollmentRoutes from "./Enrollments/routes.js";

const CONNECTION_STRING =
  process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
const app = express();
const PORT = process.env.PORT || 4000;
const ENROLLMENTS_PATH = path.resolve("../app/(kambaz)/database/enrollments.json");

let db = { enrollments: [] };
try {
  const enrollments = JSON.parse(fs.readFileSync(ENROLLMENTS_PATH, "utf-8"));
  db = { enrollments };
} catch (error) {
  console.warn("Unable to load enrollments seed for course filtering", error?.message || error);
}

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    console.log(`Connected to MongoDB at ${CONNECTION_STRING}`);
  })
  .catch((error) => {
    console.error("MongoDB connection failed", error);
  });

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  }),
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "super secret session phrase",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(express.json());

app.get("/", (_request, response) => {
  response.send("Kambaz Node server is running");
});

UserRoutes(app, {});
CourseRoutes(app, db);
ModuleRoutes(app, db);
EnrollmentRoutes(app);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});