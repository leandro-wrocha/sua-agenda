'use client';

import { useSession } from "next-auth/react"

export default function Protected() {
  const { status } = useSession();
}