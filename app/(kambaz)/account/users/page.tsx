"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import PeopleTable from "../../courses/people/Table";
import * as client from "../client";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { uid } = useParams();

  const fetchUsers = async () => {
    try {
      const users = await client.findAllUsers();
      setUsers(users);
    } catch (error) {
      setErrorMessage("Unable to load users right now.");
    }
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    setErrorMessage("");
    try {
      if (role) {
        const users = await client.findUsersByRole(role);
        setUsers(users);
      } else {
        fetchUsers();
      }
    } catch (error) {
      setErrorMessage("Unable to filter users by role right now.");
    }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    setErrorMessage("");
    try {
      if (name) {
        const users = await client.findUsersByPartialName(name);
        setUsers(users);
      } else {
        fetchUsers();
      }
    } catch (error) {
      setErrorMessage("Unable to filter users by name right now.");
    }
  };

  const createUser = async () => {
    setErrorMessage("");
    try {
      const user = await client.createUser({
        firstName: "New",
        lastName: `User${users.length + 1}`,
        username: `newuser${Date.now()}`,
        password: "password123",
        email: `email${users.length + 1}@neu.edu`,
        section: "S101",
        role: "STUDENT",
      });
      setUsers((previousUsers) => [...previousUsers, user]);
    } catch (error) {
      setErrorMessage("Unable to create user right now.");
    }
  };

  const deleteUser = async (userId: string) => {
    setErrorMessage("");
    setUsers((previousUsers) => previousUsers.filter((user: any) => user._id !== userId));
    try {
      await client.deleteUser(userId);
    } catch (error) {
      setErrorMessage("Unable to delete user right now.");
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [uid]);

  return (
    <div>
      <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        People
      </button>
      <h3>Users</h3>
      {errorMessage && <div className="alert alert-danger py-2">{errorMessage}</div>}
      <div className="d-flex mb-3 gap-2">
        <input
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterUsersByName(e.target.value)}
          placeholder="Search people"
          className="form-control float-start w-25 wd-filter-by-name"
        />
        <select
          value={role}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => filterUsersByRole(e.target.value)}
          className="form-select float-start w-25 wd-select-role"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
      </div>
      <PeopleTable users={users} fetchUsers={fetchUsers} onDelete={deleteUser} />
    </div>
  );
}
