'use client'

import { signIn, signOut } from "next-auth/react";

export default function Home() {

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <button onClick={() => signIn('google')}>login with google</button>
      <button onClick={() => signOut()}>logout</button>
    </div>
  );
}
