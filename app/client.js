"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Client() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Caricamento...</div>;
  }

  return (
    <div>
      {session ? (
        <div>
          <p>Loggato come: {session.user.email}</p>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}
    </div>
  );
}
