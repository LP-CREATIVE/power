// src/app/roster/[playerId]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import { getPlayerById } from '@/lib/data';
import type { Player } from '@/lib/data'; // Ensured type-only import

// Props for the page component, params will contain playerId
interface PlayerPageProps {
  params: {
    playerId: string; 
  };
}

const PlayerPerformancePage = ({ params }: PlayerPageProps) => {
  if (!params || typeof params.playerId !== 'string') {
    // console.error("Error: Invalid params or playerId not found in params.", params); // Removed
    notFound(); 
    return null;
  }

  const playerIdNum = parseInt(params.playerId, 10);

  if (isNaN(playerIdNum)) {
    // console.error(`Error: Could not parse playerId "${params.playerId}" to a valid number.`); // Removed
    notFound(); 
    return null;
  }

  // Explicitly use the Player type for the player variable
  const player: Player | undefined = getPlayerById(playerIdNum); 

  if (!player) {
    // console.log(`Player with ID ${playerIdNum} not found.`); // Removed
    notFound();
    return null;
  }

  const performanceMetrics = [
    { metric: 'Touchdowns', value: 'N/A' },
    { metric: 'Rushing Yards', value: 'N/A' },
    { metric: 'Receiving Yards', value: 'N/A' },
    { metric: 'Tackles', value: 'N/A' },
    { metric: 'Interceptions', value: 'N/A' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
            <div className="text-center md:text-left md:w-full"> 
              <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">{player.name}</h1>
              <p className="text-xl text-gray-300 mb-1">#{player.number} - {player.position}</p>
              <p className="text-md text-gray-400">{player.class} | {player.height} | {player.weight} lbs</p>
            </div>
          </div>

          <hr className="my-8 border-gray-700" />

          <div>
            <h2 className="text-2xl font-semibold text-yellow-400 mb-6">Performance Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {performanceMetrics.map(stat => (
                <div key={stat.metric} className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition-colors">
                  <p className="text-sm text-gray-400 uppercase tracking-wider">{stat.metric}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-gray-500 italic">
              Performance data is currently a placeholder. You&apos;ll need to integrate your actual data source for real statistics.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayerPerformancePage;
