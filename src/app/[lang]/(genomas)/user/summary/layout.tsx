"use client";

/* context */
import { RunsProvider } from "./context/RunsContext";

export default function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RunsProvider>{children}</RunsProvider>;
}
