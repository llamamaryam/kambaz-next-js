import axios from "axios";
import { HTTP_SERVER } from "../../../../lib/http";

const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

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