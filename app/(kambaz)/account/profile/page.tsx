"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const router = useRouter();

  const fetchProfile = () => {
    if (!currentUser) return router.replace("/account/signin");
    setProfile({
      ...currentUser,
      username: currentUser.username ?? currentUser.loginId ?? "",
      password: currentUser.password ?? "password",
      dob: currentUser.dob ?? "",
      email: currentUser.email ?? "",
    });
  };

  const signout = () => {
    dispatch(setCurrentUser(null));
    router.replace("/account/signin");
  };

  useEffect(() => {
    fetchProfile();
  }, [currentUser]);

  if (!profile || !currentUser) return null;

  return (
    <div className="wd-profile-screen" id="wd-profile-screen">
      <h3>Profile</h3>
      <div>
        <input
          id="wd-username"
          className="form-control mb-2"
          value={profile.username || ""}
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        />
        <input
          id="wd-password"
          className="form-control mb-2"
          value={profile.password || ""}
          type="password"
          onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        />
        <input
          id="wd-firstname"
          className="form-control mb-2"
          value={profile.firstName || ""}
          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
        />
        <input
          id="wd-lastname"
          className="form-control mb-2"
          value={profile.lastName || ""}
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        />
        <input
          id="wd-dob"
          className="form-control mb-2"
          type="date"
          value={profile.dob || ""}
          onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
        />
        <input
          id="wd-email"
          className="form-control mb-2"
          value={profile.email || ""}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
        <select
          className="form-control mb-2"
          id="wd-role"
          value={profile.role || "USER"}
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
        <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
          Sign out
        </button>
      </div>
    </div>
  );
}