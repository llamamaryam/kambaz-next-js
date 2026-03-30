"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function SignupPage() {
  const [user, setUser] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/account/profile");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Unable to sign up");
    }
  };

  return (
    <div id="wd-signup-screen" className="container" style={{ maxWidth: 420 }}>
      <h1>Sign up</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <input
        value={user.username || ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="form-control mb-2"
        placeholder="username"
        id="wd-signup-username"
      />
      <input
        value={user.password || ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="form-control mb-2"
        placeholder="password"
        type="password"
        id="wd-signup-password"
      />
      <button onClick={signup} id="wd-signup-btn" className="btn btn-primary w-100 mb-2">
        Sign up
      </button>
      <Link href="/account/signin" id="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}