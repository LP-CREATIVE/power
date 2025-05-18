"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Mock athlete list
const mockAthletes = [
  { number: 1, name: "Ryon Lyons" },
  { number: 2, name: "Jordan Parker" },
  { number: 3, name: "Marquez Chalfant" },
  { number: 4, name: "Andrew Dakas" },
  { number: 6, name: "Cole Bain" },
  { number: 7, name: "Tucker Webb" },
  { number: 9, name: "Ari White" },
  { number: 10, name: "Jon Hendrix" },
  { number: 11, name: "Ty Webb" },
  { number: 12, name: "Bryson Trapp" },
  { number: 14, name: "Hunter Buchanan" },
  { number: 15, name: "Malachi Trapp" },
  { number: 16, name: "Jesse Foutch" },
  { number: 17, name: "Austin Nicholson" },
  { number: 18, name: "Briz Trapp" },
  { number: 19, name: "Rylan Cooper" },
  { number: 20, name: "Wyatt Carter" },
  { number: 21, name: "Jarett Hamilton" },
  { number: 22, name: "Trace Hamilton" },
  { number: 23, name: "Jon Pulley" },
  { number: 24, name: "Cecil Ketchum" },
  { number: 27, name: "Cameron Stanley" },
  { number: 28, name: "Connor Talley" },
  { number: 29, name: "Isaiah Whitlock" },
  { number: 30, name: "Kaleb Gomez" },
  { number: 31, name: "Colin Dickens" },
  { number: 34, name: "Wesley Kent" },
  { number: 35, name: "Aiden Lawrence" },
  { number: 41, name: "Koda Jenkins" },
  { number: 44, name: "Adam Johnson" },
  { number: 45, name: "Nik Daw" },
  { number: 50, name: "Blaine Atnip" },
  { number: 52, name: "Aiden Turner" },
  { number: 54, name: "Victor Locklear" },
  { number: 55, name: "Wil Farris" },
  { number: 56, name: "Aaron Hattfield" },
  { number: 57, name: "James Hannah" },
  { number: 58, name: "Bryson Arnold" },
  { number: 59, name: "Zach Boldin" },
  { number: 60, name: "Kobe Roller" },
  { number: 61, name: "Jaxson Kleparek" },
  { number: 62, name: "Connor McClure" },
  { number: 64, name: "Caydin Hecker" },
  { number: 65, name: "Brownie Johnson" },
  { number: 66, name: "Christopher Pulley" },
  { number: 67, name: "Kollin Young" },
  { number: 69, name: "Josh Hernandez" },
  { number: 73, name: "Hunter Ballew" },
  { number: 74, name: "Chase Young" },
  { number: 75, name: "Chase Sullivan" },
  { number: 77, name: "Johnathan Hernandez" },
  { number: 79, name: "Gadiel Gomez" },
  { number: 86, name: "Brandon Cook" },
  { number: 88, name: "Zachary Cook" },
];


export default function AttendancePage() {
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [autoNotify, setAutoNotify] = useState(true);

  const handleSave = () => {
  alert("Attendance saved!");
};


  const toggleAttendance = (athlete: string) => {
    setAttendance(prev => ({ ...prev, [athlete]: !prev[athlete] }));
  };


  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Attendance & Compliance</h1>
        <Button onClick={handleSave}>Save Attendance</Button>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Date</Label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={autoNotify} onCheckedChange={setAutoNotify} />
              <Label>Auto-notify absentees</Label>
            </div>
          </div>

          <div className="pt-4">
            <h2 className="font-semibold text-lg mb-2">Mark Attendance</h2>
        <ul className="space-y-2">
  {mockAthletes.map(player => (
    <li
      key={player.number}
      className={`flex justify-between items-center p-3 rounded border ${
        attendance[player.name] ? "bg-green-100" : "bg-red-100"
      }`}
    >
      <span>#{player.number} – {player.name}</span>
      <Button variant="secondary" onClick={() => toggleAttendance(player.name)}>
        {attendance[player.name] ? "Present" : "Absent"}
      </Button>
    </li>
  ))}
</ul>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
