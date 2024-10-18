// app/components/Protected.js
"use client";

import { ContextData } from "@/app/DataProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const Protected = ({ children }) => {
  const { loading } = useContext(ContextData);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login page if user is not logged in
      router.push(`/login?redirect=${window.location.pathname}`);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center lg:p-20 mt-5 lg:mt-0">
        <span className="loading loading-ring loading-lg flex justify-center items-center"></span>
      </div>
    );
  }

  return user ? children : null;
};

export default Protected;
