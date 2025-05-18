"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { X, ArrowUp, ArrowDown } from "lucide-react";

// Define types
type Exercise = {
  id: string;
  category: string;
  name: string;
  sets: string;
  reps: string;
  weight: string;
  rest: string;
  notes: string;
};

type Workout = {
  title: string;
  date: string;
  assignedTo: string;
  exercises: Exercise[];
};

export default function WorkoutPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [newWorkout, setNewWorkout] = useState<Workout>({
    title: "",
    date: "",
    assignedTo: "",
    exercises: [],
  });
  const [exercise, setExercise] = useState<Exercise>({
    id: "",
    category: "",
    name: "",
    sets: "",
    reps: "",
    weight: "",
    rest: "",
    notes: "",
  });
  const [repeatWeekly, setRepeatWeekly] = useState(false);

  const addExercise = () => {
    const newId = crypto.randomUUID();
    setNewWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, { ...exercise, id: newId }],
    }));
    setExercise({ id: "", category: "", name: "", sets: "", reps: "", weight: "", rest: "", notes: "" });
  };

  const removeExercise = (id: string) => {
    setNewWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== id),
    }));
  };

  const moveExercise = (index: number, direction: "up" | "down") => {
    const list = [...newWorkout.exercises];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    [list[index], list[targetIndex]] = [list[targetIndex], list[index]];
    setNewWorkout(prev => ({ ...prev, exercises: list }));
  };

  const saveWorkout = () => {
    setWorkouts([...workouts, newWorkout]);
    setNewWorkout({ title: "", date: "", assignedTo: "", exercises: [] });
    setRepeatWeekly(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Workouts</h1>
        <Button onClick={saveWorkout}>Save & Schedule</Button>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Workout Title</Label>
              <Input value={newWorkout.title} onChange={e => setNewWorkout({ ...newWorkout, title: e.target.value })} />
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" value={newWorkout.date} onChange={e => setNewWorkout({ ...newWorkout, date: e.target.value })} />
            </div>
            <div>
              <Label>Assign To</Label>
              <Input value={newWorkout.assignedTo} onChange={e => setNewWorkout({ ...newWorkout, assignedTo: e.target.value })} />
            </div>
          </div>

          <div className="border-t pt-4">
            <h2 className="font-semibold text-lg mb-2">Add Exercise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input placeholder="Category (e.g. Warm-up)" value={exercise.category} onChange={e => setExercise({ ...exercise, category: e.target.value })} />
              <Input placeholder="Exercise Name" value={exercise.name} onChange={e => setExercise({ ...exercise, name: e.target.value })} />
              <Input placeholder="Sets" value={exercise.sets} onChange={e => setExercise({ ...exercise, sets: e.target.value })} />
              <Input placeholder="Reps" value={exercise.reps} onChange={e => setExercise({ ...exercise, reps: e.target.value })} />
              <Input placeholder="Weight" value={exercise.weight} onChange={e => setExercise({ ...exercise, weight: e.target.value })} />
              <Input placeholder="Rest Time" value={exercise.rest} onChange={e => setExercise({ ...exercise, rest: e.target.value })} />
              <Textarea placeholder="Notes" value={exercise.notes} onChange={e => setExercise({ ...exercise, notes: e.target.value })} />
            </div>
            <Button onClick={addExercise} className="mt-3">+ Add Exercise</Button>

            {newWorkout.exercises.length > 0 && (
              <ul className="mt-4 space-y-2">
                {newWorkout.exercises.map((ex, index) => (
                  <li key={ex.id} className="flex items-start justify-between border rounded px-3 py-2 bg-white shadow">
                    <div className="flex-1">
                      <div className="font-medium">{ex.name} ({ex.category})</div>
                      <div className="text-xs text-muted-foreground">
                        {ex.sets} sets x {ex.reps} reps @ {ex.weight} ({ex.rest} rest)
                        {ex.notes && ` – ${ex.notes}`}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 pl-4">
                      <button onClick={() => moveExercise(index, "up")}><ArrowUp className="h-4 w-4 text-gray-500" /></button>
                      <button onClick={() => moveExercise(index, "down")}><ArrowDown className="h-4 w-4 text-gray-500" /></button>
                      <button onClick={() => removeExercise(ex.id)}><X className="h-4 w-4 text-red-500 hover:text-red-700" /></button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <Switch checked={repeatWeekly} onCheckedChange={setRepeatWeekly} />
            <Label>Repeat Weekly</Label>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-2">Scheduled Workouts</h2>
        {workouts.length === 0 ? (
          <p className="text-muted-foreground">No workouts scheduled yet.</p>
        ) : (
          <div className="space-y-4">
            {workouts.map((w, i) => (
              <Card key={i}>
                <CardContent className="pt-4">
                  <div className="font-semibold text-xl">{w.title} - {w.date}</div>
                  <div className="text-sm text-muted-foreground">Assigned To: {w.assignedTo}</div>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {w.exercises.map((ex, j) => (
                      <li key={j}>
                        <span className="font-medium">{ex.name}</span> - {ex.sets} sets x {ex.reps} reps @ {ex.weight} ({ex.rest} rest) - {ex.notes}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


