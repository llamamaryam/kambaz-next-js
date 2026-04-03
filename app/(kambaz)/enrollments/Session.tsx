"use client";

import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setEnrollments } from "./reducer";
import * as client from "./client";

export default function EnrollmentsSession({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!currentUser) {
        dispatch(setEnrollments([]));
        setPending(false);
        return;
      }
      try {
        const enrollments = await client.findMyEnrollments();
        dispatch(setEnrollments(enrollments));
      } catch (error) {
        if (!axios.isAxiosError(error) || error.response?.status !== 401) {
          console.error(error);
        }
        dispatch(setEnrollments([]));
      }
      setPending(false);
    };

    setPending(true);
    fetchEnrollments();
  }, [currentUser, dispatch]);

  if (pending) {
    return null;
  }

  return children;
}