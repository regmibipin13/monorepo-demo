"use client";
import { useAuth } from "@context";
import { useRouter } from "next/navigation";

import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();

  console.log(user);

  if (!user) {
    router.replace("/login");
    return <></>;
  } else if (!user.emailVerified) {
    router.push("/verify");
    return <> </>;
  }
  return children;
};

export default ProtectedLayout;
