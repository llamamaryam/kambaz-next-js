import fs from "node:fs";
import path from "node:path";

export default function ServerComponentDemo() {
  const cwd = process.cwd();
  const files = fs.readdirSync(path.join(cwd, "app", "labs", "lab3"));
  const serverTime = new Date().toISOString();

  return (
    <div>
      <h4>Server Component Demo</h4>
      <div>Node env: {process.env.NODE_ENV}</div>
      <div>Server time: {serverTime}</div>
      <div>Files: {files.join(", ")}</div>
    </div>
  );
}