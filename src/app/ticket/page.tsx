"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const roster = [
  { number: 1, name: "Jaxon Carter", position: "QB", grade: "12" },
  { number: 2, name: "Mason Rivera", position: "WR", grade: "11" },
  { number: 3, name: "Ezra Wells", position: "RB", grade: "12" },
  { number: 4, name: "Caleb Reed", position: "DB", grade: "10" },
  { number: 5, name: "Logan Price", position: "LB", grade: "11" },
  { number: 6, name: "Nolan Brooks", position: "WR", grade: "12" },
  { number: 7, name: "Isaiah Hayes", position: "OL", grade: "12" },
  { number: 8, name: "Carter Bryant", position: "DL", grade: "9" },
  { number: 9, name: "Miles Griffin", position: "RB", grade: "11" },
  { number: 10, name: "Brody King", position: "QB", grade: "10" },
];

export default function RosterPage() {
  const [search, setSearch] = useState("");
  const filteredRoster = roster.filter(
    (player) =>
      player.name.toLowerCase().includes(search.toLowerCase()) ||
      player.position.toLowerCase().includes(search.toLowerCase()) ||
      player.grade === search
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team Roster</h1>
        <Input
          placeholder="Search by name, position, or grade"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoster.map((player) => (
          <Card
            key={player.number}
            className="hover:scale-[1.03] transition-transform duration-200"
          >
            <CardContent className="p-4 space-y-2">
              <div className="text-xl font-semibold flex justify-between">
                #{player.number} <Badge>{player.position}</Badge>
              </div>
              <div className="text-lg">{player.name}</div>
              <div className="text-muted-foreground text-sm">Grade: {player.grade}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
