"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import * as client from "../../account/client";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const fetchUser = async () => {
    if (!uid) return;
    const userFromServer = await client.findUserById(uid);
    setUser(userFromServer);
    setName(`${userFromServer?.firstName || ""} ${userFromServer?.lastName || ""}`.trim());
  };

  useEffect(() => {
    if (uid) {
      fetchUser();
    }
  }, [uid]);

  if (!uid) return null;

  const closeDetails = () => {
    onClose();
    router.push("/account/users");
  };

  const saveUser = async () => {
    const [firstNameFromInput, ...lastNameParts] = name.trim().split(/\s+/);
    const updatedUser = {
      ...user,
      firstName: firstNameFromInput || user.firstName,
      lastName: lastNameParts.join(" ") || user.lastName,
    };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
    router.push("/account/users");
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow" style={{ width: "25rem", zIndex: 1050 }}>
      <button onClick={closeDetails} className="btn position-absolute end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2" style={{ fontSize: "4rem" }} />
      </div>
      <hr />
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil onClick={() => setEditing(true)} className="float-end fs-5 mt-2 wd-edit" style={{ cursor: "pointer" }} />
        )}
        {editing && (
          <FaCheck onClick={saveUser} className="float-end fs-5 mt-2 me-2 wd-save" style={{ cursor: "pointer" }} />
        )}
        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)} style={{ cursor: "pointer" }}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {editing && (
          <input
            type="text"
            className="form-control w-50 wd-edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();
              }
            }}
          />
        )}
      </div>
      <b>Roles:</b>{" "}
      {!editing && <span className="wd-roles">{user.role}</span>}
      {editing && (
        <select
          className="form-select w-50 d-inline-block wd-edit-role"
          value={user.role || "USER"}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
          <option value="USER">Users</option>
        </select>
      )}
      <br />
      <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span>
      <br />
      <b>Email:</b>{" "}
      {!editing && <span className="wd-email">{user.email}</span>}
      {editing && (
        <input
          type="email"
          className="form-control w-75 d-inline-block wd-edit-email"
          value={user.email || ""}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      )}
      <br />
      <b>Section:</b> <span className="wd-section">{user.section}</span>
      <br />
      <b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span>
    </div>
  );
}
