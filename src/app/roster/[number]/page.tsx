const roster = [
  { number: 1, name: "Ryon Lyons", position: "WR, DB", grade: "FR" },
  { number: 2, name: "Jordan Parker", position: "QB, DB", grade: "JR" },
  // Add more players as needed
];

export default function Page({ params }: any) {
  const number = parseInt(params.number, 10);
  const player = roster.find(p => p.number === number);

  if (!player) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Player not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{player.name}</h1>
      <p><strong>Number:</strong> {player.number}</p>
      <p><strong>Position:</strong> {player.position}</p>
      <p><strong>Grade:</strong> {player.grade}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Performance Metrics</h2>
        <ul className="list-disc ml-6">
          <li>Speed: 19.2 mph</li>
          <li>Reps: 42</li>
          <li>Strength: High</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Workout History</h2>
        <ul className="list-disc ml-6">
          <li>2025-07-01: Bench Press - 225lbs x10</li>
          <li>2025-07-02: 40yd Dash - 4.6s</li>
        </ul>
      </div>
    </div>
  );
}
