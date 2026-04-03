"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import * as client from "../client";
import { setCurrentUser } from "../reducer";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      setErrorMessage("");
      const user = await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setErrorMessage("Invalid username or password.");
        return;
      }
      console.error(error);
      setErrorMessage("Unable to sign in right now. Check that the Node server is running.");
    }
  };

  return (
    <div id="wd-signin-screen" className="container" style={{ maxWidth: 420 }}>
      <h1>Sign in</h1>
      <input
        value={credentials.username || ""}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="form-control mb-2"
        placeholder="username"
        id="wd-username"
      />
      <input
        value={credentials.password || ""}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="form-control mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <button onClick={signin} id="wd-signin-btn" className="btn btn-danger w-100 mb-2">
        Sign in
      </button>
      {errorMessage && <div className="alert alert-danger py-2">{errorMessage}</div>}
      <Link id="wd-signup-link" href="/account/signup">
        Sign up
      </Link>
    </div>
  );
}