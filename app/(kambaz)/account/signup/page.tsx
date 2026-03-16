"use client";

import Link from "next/link";

export default function SignupPage() {
  return (
    <div id="wd-signup-screen" className="container" style={{ maxWidth: 420 }}>
      <h1>Sign up</h1>
      <input className="form-control mb-2" placeholder="username" id="wd-signup-username" />
      <input className="form-control mb-2" placeholder="password" type="password" id="wd-signup-password" />
      <input
        className="form-control mb-2"
        placeholder="verify password"
        type="password"
        id="wd-verify-password"
      />
      <button id="wd-signup-btn" className="btn btn-primary w-100 mb-2">
        Sign up
      </button>
      <Link href="/account/signin" id="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}