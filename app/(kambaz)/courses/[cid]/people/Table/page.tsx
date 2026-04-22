"use client";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as coursesClient from "../../../client";
import * as client from "../client";

const emptyUser = {
  firstName: "",
  lastName: "",
  loginId: "",
  section: "",
  role: "STUDENT",
  lastActivity: "",
  totalActivity: "",
};

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState<any>(emptyUser);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const fetchUsers = async () => {
      const courseUsers = await coursesClient.findUsersForCourse(cid);
      setUsers(courseUsers);
    };

    fetchUsers();
  }, [cid]);

  const saveUser = async () => {
    if (editingUserId) {
      const updatedUser = await client.updateUser({ ...user, _id: editingUserId });
      setUsers(users.map((currentUser: any) => (currentUser._id === editingUserId ? updatedUser : currentUser)));
    } else {
      const newUser = await client.createUserForCourse(cid, {
        ...user,
        username: user.loginId,
      });
      setUsers([...users, newUser]);
    }
    setUser(emptyUser);
    setEditingUserId(null);
  };

  const editUser = (selectedUser: any) => {
    setUser(selectedUser);
    setEditingUserId(selectedUser._id);
  };

  const removeUser = async (userId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
    await client.deleteUser(userId);
    setUsers(users.filter((currentUser: any) => currentUser._id !== userId));
    if (editingUserId === userId) {
      setUser(emptyUser);
      setEditingUserId(null);
    }
  };

  return (
    <div id="wd-people-table">
      <h3>People</h3>
      {isFaculty && (
        <div className="border rounded p-3 mb-3">
          <div className="row g-2">
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="First Name"
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Last Name"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Login ID"
                value={user.loginId}
                onChange={(e) => setUser({ ...user, loginId: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Section"
                value={user.section}
                onChange={(e) => setUser({ ...user, section: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="STUDENT">Student</option>
                <option value="TA">TA</option>
                <option value="FACULTY">Faculty</option>
              </select>
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Last Activity"
                value={user.lastActivity}
                onChange={(e) => setUser({ ...user, lastActivity: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Total Activity"
                value={user.totalActivity}
                onChange={(e) => setUser({ ...user, totalActivity: e.target.value })}
              />
            </div>
            <div className="col-md-3 d-flex gap-2">
              <button className="btn btn-danger flex-fill" onClick={saveUser}>
                {editingUserId ? "Update" : "Add"}
              </button>
              <button
                className="btn btn-secondary flex-fill"
                onClick={() => {
                  setUser(emptyUser);
                  setEditingUserId(null);
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {isFaculty && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name me-1">{user.firstName}</span>
                  <span className="wd-last-name">{user.lastName}</span>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
                {isFaculty && (
                  <td className="text-nowrap">
                    <button className="btn btn-sm btn-warning me-2" onClick={() => editUser(user)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => removeUser(user._id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}