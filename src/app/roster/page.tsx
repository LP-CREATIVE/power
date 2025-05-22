// src/app/roster/page.tsx
'use client'; // Keep this if you have client-side interactions or hooks

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Or other state/imports
import Container from "@/components/container"; // Your existing import

// Your roster data constant from the screenshot
const roster = [
  { number: 1, name: "Kvon Lyons", position: "WR, DB", grade: "FR" },
  { number: 2, name: "Jordan Parker", position: "QB, DB", grade: "JR" },
  // ... other players
  { number: 24, name: "Cecil Ketchum", position: "WR, LB", grade: "FR" },
];

export default function RosterPage() {
  return (
    <Container> {/* Using your Container component */}
      <h1 className="text-2xl font-bold mb-4">Team Roster</h1>
      <ul>
        {roster.map((player) => (
          <li key={player.number} className="mb-2">
            <Link href={`/roster/${player.number}`} className="text-blue-500 hover:underline">
              {player.name} - {player.position} ({player.grade})
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
