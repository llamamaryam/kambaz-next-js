"use client";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Session({ children }: { children: any }) {
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      if (!axios.isAxiosError(err) || (err.response?.status !== 401 && err.code !== "ERR_NETWORK")) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return children;
}
