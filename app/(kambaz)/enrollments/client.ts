import axios from "axios";
import { HTTP_SERVER } from "../../lib/http";

const axiosWithCredentials = axios.create({ withCredentials: true });
const USERS_API = `${HTTP_SERVER}/api/users`;

export const findMyEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/enrollments`);
  return data;
};

export const enrollInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses/${courseId}/enrollment`);
  return data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${USERS_API}/current/courses/${courseId}/enrollment`);
  return data;
};