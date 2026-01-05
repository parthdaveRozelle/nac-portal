"use client";

import { jwtDecode } from "jwt-decode";
import { TOKEN } from "@/constants";
import { IDecodedToken } from "@/interfaces";

export const useUserDetails = (): IDecodedToken | null => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem(TOKEN);
  if (!token) return null;

  try {
    const decoded = jwtDecode<IDecodedToken>(token);
    return {
      _id: decoded._id,
      doctorName: decoded.doctorName,
      email: decoded.email,
    };
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
