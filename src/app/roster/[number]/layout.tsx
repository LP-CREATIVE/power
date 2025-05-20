import Link from "next/link";
import { ReactNode } from "react";

export default function PlayerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <header className="mb-6">
        <Link
          href="/roster"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Roster
        </Link>
        <h1 className="text-2xl font-bold mt-2">Player Profile</h1>
      </header>

      <main>{children}</main>
    </div>
  );
}
