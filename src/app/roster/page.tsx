"use client";

import { useState } from "react";
import Container from "@/components/container";

const roster = [
  { number: 1, name: "Ryon Lyons", position: "WR, DB", grade: "FR" },
  { number: 2, name: "Jordan Parker", position: "QB, DB", grade: "JR" },
  { number: 3, name: "Marquez Chalfant", position: "WR, DB", grade: "SR" },
  { number: 4, name: "Andrew Dakas", position: "RB, LB", grade: "JR" },
  { number: 6, name: "Cole Bain", position: "RB, LB", grade: "JR" },
  { number: 7, name: "Tucker Webb", position: "RB, LB", grade: "FR" },
  { number: 9, name: "Ari White", position: "RB, LB", grade: "SR" },
  { number: 10, name: "Jon Hendrix", position: "WR, DB", grade: "JR" },
  { number: 11, name: "Ty Webb", position: "WR, DB", grade: "SR" },
  { number: 12, name: "Bryson Trapp", position: "WR, DB", grade: "SR" },
  { number: 14, name: "Hunter Buchanan", position: "RB, LB", grade: "JR" },
  { number: 15, name: "Malachi Trapp", position: "RB, LB", grade: "SR" },
  { number: 16, name: "Jesse Foutch", position: "QB, DB", grade: "FR" },
  { number: 17, name: "Austin Nicholson", position: "WR, DB", grade: "SR" },
  { number: 18, name: "Briz Trapp", position: "QB, DB", grade: "SR" },
  { number: 19, name: "Rylan Cooper", position: "WR, DB", grade: "FR" },
  { number: 20, name: "Wyatt Carter", position: "RB, LB", grade: "SO" },
  { number: 21, name: "Jarett Hamilton", position: "OL, DL", grade: "SO" },
  { number: 22, name: "Trace Hamilton", position: "WR, DB", grade: "SR" },
  { number: 23, name: "Jon Pulley", position: "WR, DB", grade: "SO" },
  { number: 24, name: "Cecil Ketchum", position: "RB, LB", grade: "FR" },
  { number: 27, name: "Cameron Stanley", position: "WR, DB", grade: "FR" },
  { number: 28, name: "Connor Talley", position: "WR, DB", grade: "FR" },
  { number: 29, name: "Isaiah Whitlock", position: "WR, DB", grade: "SR" },
  { number: 30, name: "Kaleb Gomez", position: "WR, DB", grade: "JR" },
  { number: 31, name: "Colin Dickens", position: "WR, DB", grade: "SR" },
  { number: 34, name: "Wesley Kent", position: "OL, DL", grade: "SO" },
  { number: 35, name: "Aiden Lawrence", position: "WR, DB", grade: "SO" },
  { number: 41, name: "Koda Jenkins", position: "RB, LB", grade: "FR" },
  { number: 44, name: "Adam Johnson", position: "WR, DB", grade: "FR" },
  { number: 45, name: "Nik Daw", position: "RB, LB", grade: "FR" },
  { number: 50, name: "Blaine Atnip", position: "OL, DL", grade: "FR" },
  { number: 52, name: "Aiden Turner", position: "OL, DL", grade: "SO" },
  { number: 54, name: "Victor Locklear", position: "OL, DL", grade: "SR" },
  { number: 55, name: "Wil Farris", position: "OL, DL", grade: "SR" },
  { number: 56, name: "Aaron Hattfield", position: "OL, DL", grade: "SR" },
  { number: 57, name: "James Hannah", position: "OL, DL", grade: "SO" },
  { number: 58, name: "Bryson Arnold", position: "OL, DL", grade: "SO" },
  { number: 59, name: "Zach Boldin", position: "OL, DL", grade: "SR" },
  { number: 60, name: "Kobe Roller", position: "OL, DL", grade: "JR" },
  { number: 61, name: "Jaxson Kleparek", position: "OL, DL", grade: "SR" },
  { number: 62, name: "Connor McClure", position: "OL, DL", grade: "SO" },
  { number: 64, name: "Caydin Hecker", position: "OL, DL", grade: "FR" },
  { number: 65, name: "Brownie Johnson", position: "OL, DL", grade: "SO" },
  { number: 66, name: "Christopher Pulley", position: "OL, DL", grade: "SR" },
  { number: 67, name: "Kollin Young", position: "OL, DL", grade: "FR" },
  { number: 69, name: "Josh Hernandez", position: "OL, DL", grade: "SR" },
  { number: 73, name: "Hunter Ballew", position: "OL, DL", grade: "SO" },
  { number: 74, name: "Chase Young", position: "OL, DL", grade: "FR" },
  { number: 75, name: "Chase Sullivan", position: "OL, DL", grade: "SR" },
  { number: 77, name: "Johnathan Hernandez", position: "OL, DL", grade: "SR" },
  { number: 79, name: "Gadiel Gomez", position: "OL, DL", grade: "SR" },
  { number: 86, name: "Brandon Cook", position: "WR, DB", grade: "FR" },
  { number: 88, name: "Zachary Cook", position: "WR, DB", grade: "FR" },
];

type Player = typeof roster[number];
type SortKey = keyof Player;

export default function RosterPage() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("number");
  const [ascending, setAscending] = useState(true);

  const filtered = roster
    .filter((player) =>
      player.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortKey].toString().toLowerCase();
      const bVal = b[sortKey].toString().toLowerCase();
      return ascending
        ? aVal.localeCompare(bVal, undefined, { numeric: true })
        : bVal.localeCompare(aVal, undefined, { numeric: true });
    });

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setAscending(!ascending);
    else {
      setSortKey(key);
      setAscending(true);
    }
  };

  const getSortIcon = (key: SortKey) => {
    if (key !== sortKey) return "";
    return ascending ? "▲" : "▼";
  };

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
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("number")}># {getSortIcon("number")}</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("name")}>Name {getSortIcon("name")}</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("position")}>Position {getSortIcon("position")}</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("grade")}>Grade {getSortIcon("grade")}</th>
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


