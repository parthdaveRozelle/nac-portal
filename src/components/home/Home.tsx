"use client";

import { ROUTES } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(ROUTES.LOGIN);
  }, []);
  return <></>;
};
