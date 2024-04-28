"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <h1>Welcome {session.user.email}</h1>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="text-white ">Not Signed In</h1>
        <button
          className="bg-orange-600 border boder-white px-3 py-1 m-4 rounded-lg"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
    );
  }
};

export default page;
