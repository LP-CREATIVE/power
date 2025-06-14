import Link from "next/link";
import { getPlayerById } from "@/lib/data";

export default function Page({ params }: { params: { id: string } }) {
  const player = getPlayerById(Number(params.id));

  if (!player) {
    return (
      <div className="p-6 space-y-4">
        <Link href="/roster" className="text-primary hover:underline">
          &larr; Back to Roster
        </Link>
        <p>Player not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Link href="/roster" className="text-primary hover:underline text-sm">
        &larr; Back to Roster
      </Link>
      <div className="flex flex-col items-center">
        {player.imageUrl && (
          <img
            src={player.imageUrl}
            alt={player.name}
            width={128}
            height={128}
            className="rounded-full border mb-4"
          />
        )}
        <h1 className="text-3xl font-bold text-primary mb-1">{player.name}</h1>
        <p className="text-muted-foreground mb-4">{player.position}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="font-medium text-muted-foreground">Number</div>
          <div>{player.number}</div>
          <div className="font-medium text-muted-foreground">Class</div>
          <div>{player.class}</div>
          <div className="font-medium text-muted-foreground">Height</div>
          <div>{player.height}</div>
          <div className="font-medium text-muted-foreground">Weight</div>
          <div>{player.weight} lbs</div>
        </div>
      </div>
    </div>
  );
}
