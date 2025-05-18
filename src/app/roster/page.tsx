"use client";

import { useState } from "react";
import Container from "@/components/container";

const roster = [
  { number: 1, name: "Lucas Phillips", position: "QB", grade: "12" },
  { number: 7, name: "Jayden Smith", position: "WR", grade: "11" },
  { number: 22, name: "Malik Johnson", position: "RB", grade: "10" },
  { number: 44, name: "Ethan Brown", position: "LB", grade: "12" },
  { number: 55, name: "Noah Davis", position: "DL", grade: "11" },
];

export default function RosterPage() {
  const [search, setSearch] = useState("");

  const filtered = roster.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="p-6">
      <h1 className="text-2xl font-bold mb-4">Team Roster</h1>

      <input
        type="text"
        placeholder="Search player..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full max-w-sm rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground"
      />

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full table-auto border border-border bg-card text-sm text-left">
          <thead className="bg-muted text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Position</th>
              <th className="px-4 py-3">Grade</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((player) => (
              <tr
                key={player.number}
                className="border-t border-border hover:bg-muted transition"
              >
                <td className="px-4 py-2 font-semibold text-primary">
                  {player.number}
                </td>
                <td className="px-4 py-2">{player.name}</td>
                <td className="px-4 py-2">{player.position}</td>
                <td className="px-4 py-2">{player.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-6 text-muted-foreground text-center">
            No players found.
          </div>
        )}
      </div>
    </Container>
  );
}
