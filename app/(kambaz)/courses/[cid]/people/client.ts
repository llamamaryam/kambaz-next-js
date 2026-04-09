import axios from "axios";

const COURSES_API = "/api/courses";
const USERS_API = "/api/users";

export const findUsersForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/users`);
  return data;
};

export const createUserForCourse = async (courseId: string, user: any) => {
  const { data } = await axios.post(`${COURSES_API}/${courseId}/users`, user);
  return data;
};

export const updateUser = async (user: any) => {
  const { data } = await axios.put(`${USERS_API}/${user._id}`, user);
  return data;
};

export const deleteUser = async (userId: string) => {
  const { data } = await axios.delete(`${USERS_API}/${userId}`);
  return data;
};