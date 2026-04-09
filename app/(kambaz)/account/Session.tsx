"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const shouldSkipProfileCheck = pathname === "/account/signin" || pathname === "/account/signup";

  const fetchProfile = async () => {
    if (shouldSkipProfileCheck) {
      setPending(false);
      return;
    }

    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      if (!axios.isAxiosError(err) || (err.response?.status !== 401 && err.code !== "ERR_NETWORK")) {
        console.error(err);
      }
    }
    setPending(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [pathname]);

  if (!pending) {
    return children;
  }

  return null;
}
