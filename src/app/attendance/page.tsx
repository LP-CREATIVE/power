"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Mock athlete list
const mockAthletes = [
  "Jaxon Moore",
  "Leo Harris",
  "Mason White",
  "Eli Thompson",
  "Noah Brooks",
  "Carter James",
];

export default function AttendancePage() {
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [autoNotify, setAutoNotify] = useState(true);

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
              {mockAthletes.map(name => (
                <li
                  key={name}
                  className={`flex justify-between items-center p-3 rounded border ${attendance[name] ? "bg-green-100" : "bg-red-100"}`}
                >
                  <span>{name}</span>
                  <Button variant="secondary" onClick={() => toggleAttendance(name)}>
                    {attendance[name] ? "Present" : "Absent"}
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
