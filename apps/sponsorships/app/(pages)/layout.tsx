"use client";

import {AuthProvider} from "@/context/authContext";
import {auth} from "@/firebase/firebase";
import {User, onAuthStateChanged} from "firebase/auth";

import React, {useEffect, useState} from "react";

const ProtectedLayout = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setTimeout(() => {
        setLoader(false);
      }, 500);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthProvider value={{user, setUser}}>
      {!loader && (
        <>
          <main>{children}</main>
        </>
      )}
      {loader && (
        <>
          <main>
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          </main>
        </>
      )}
      <></>
    </AuthProvider>
  );
};

export default ProtectedLayout;
