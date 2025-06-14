import { getPlayerById } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

// ✅ This is correct — do NOT treat `props` as a Promise
export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const player = await getPlayerById(id);

  if (!player) {
    return (
      <div className="p-6">
        <Link href="/roster" className="text-primary hover:underline text-sm">
          ← Back to Roster
        </Link>
        <p className="mt-4 text-lg text-muted-foreground">Player not found.</p>
      </div>
    );
  }

  // ...rest of the JSX



  const workoutStats = {
    totalWorkouts: 16,
    avgReps: 48,
    avgWeight: "135 lbs",
    lastWorkouts: [
      { title: "Upper Body Blast", date: "June 10", completed: true },
      { title: "Speed & Agility", date: "June 7", completed: true },
      { title: "Core Stability", date: "June 4", completed: false },
    ],
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <Link href="/roster" className="text-primary hover:underline text-sm">
        ← Back to Roster
      </Link>

      <div className="flex flex-col items-center">
        <img
          src={player.imageUrl}
          alt={player.name}
          className="w-32 h-32 rounded-full border shadow mb-4"
        />
        <h1 className="text-3xl font-bold text-primary">{player.name}</h1>
        <p className="text-muted-foreground text-sm">{player.position}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm border p-4 rounded-md bg-muted">
        <div>
          <p className="font-medium text-muted-foreground">Number</p>
          <p>{player.number}</p>
        </div>
        <div>
          <p className="font-medium text-muted-foreground">Class</p>
          <p>{player.class}</p>
        </div>
        <div>
          <p className="font-medium text-muted-foreground">Height</p>
          <p>{player.height}</p>
        </div>
        <div>
          <p className="font-medium text-muted-foreground">Weight</p>
          <p>{player.weight} lbs</p>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-primary">Workout Performance</h2>
        <ul className="grid gap-2">
          <li>Total Workouts: <strong>{workoutStats.totalWorkouts}</strong></li>
          <li>Average Reps per Session: <strong>{workoutStats.avgReps}</strong></li>
          <li>Average Weight Lifted: <strong>{workoutStats.avgWeight}</strong></li>
        </ul>

        <div className="pt-4">
          <h3 className="text-md font-medium text-muted-foreground mb-2">Recent Sessions</h3>
          <ul className="grid gap-1">
            {workoutStats.lastWorkouts.map((wo, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span>{wo.title}</span>
                <span className={wo.completed ? "text-green-600" : "text-yellow-600"}>
                  {wo.completed ? "✔ Completed" : "✖ Missed"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
