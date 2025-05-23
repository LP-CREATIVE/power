import React from 'react';
import Link from 'next/link';
import { playerData, Player } from '@/lib/data';

const RosterPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <main className="container mx-auto px-4 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">Team Roster</h1>

        <div className="overflow-x-auto rounded-lg shadow-xl border border-border">
          <table className="min-w-full bg-card text-card-foreground">
            <thead className="bg-popover text-popover-foreground border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Height
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Class
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted">
              {playerData.map((player: Player) => (
                <tr key={player.id} className="hover:bg-muted transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/roster/${player.id}`}
                      className="text-sm font-medium text-primary hover:text-primary-hover hover:underline"
                    >
                      {player.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{player.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-center">
                    {player.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{player.height}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {player.weight} lbs
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{player.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {playerData.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">No players on the roster yet.</p>
        )}
      </main>
    </div>
  );
};

export default RosterPage;
