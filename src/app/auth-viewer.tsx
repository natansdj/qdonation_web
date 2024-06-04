"use client";

import React from "react";
import { useAppSelector } from "@/store";

const AuthViewer = () => {
  const authState = useAppSelector((state) => state.auth.authState);

  return (
    <>
      You are now {authState ? "Logged  In" : "Logged Out"}
    </>
  );
};

export default AuthViewer;
