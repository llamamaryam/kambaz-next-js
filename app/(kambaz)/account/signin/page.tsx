import Link from "next/link";

export default function SigninPage() {
  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h2 className="mb-4">Sign In</h2>
      <div className="mb-3">
        <label htmlFor="wd-username" className="form-label">Username</label>
        <input id="wd-username" className="form-control" defaultValue="ritam" />
      </div>
      <div className="mb-3">
        <label htmlFor="wd-password" className="form-label">Password</label>
        <input id="wd-password" type="password" className="form-control" defaultValue="password" />
      </div>
      <div className="d-grid gap-2 mb-3">
        <Link href="/dashboard" className="btn btn-danger">Sign In</Link>
      </div>
      <div>
        <Link href="/labs" className="text-decoration-none">Go to Labs</Link>
      </div>
    </div>
  );
}