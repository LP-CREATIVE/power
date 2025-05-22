// src/app/roster/[playerId]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import { getPlayerById } from '@/lib/data';
import type { Player } from '@/lib/data'; // Use type-only import for Player

// Props for the page component, params will contain playerId
interface PlayerPageProps {
  params: {
    playerId: string; // The dynamic segment from the URL, will be a string
  };
}

const PlayerPerformancePage = ({ params }: PlayerPageProps) => {
  // Validate playerId parameter from params
  if (!params || typeof params.playerId !== 'string') {
    console.error("Error: Invalid params or playerId not found in params.", params);
    notFound(); // Or handle as a bad request, e.g., redirect or show specific error
    return null;
  }

  const playerIdNum = parseInt(params.playerId, 10);

  // Check if parsing was successful (parseInt returns NaN for invalid strings)
  if (isNaN(playerIdNum)) {
    console.error(`Error: Could not parse playerId "${params.playerId}" to a valid number.`);
    notFound(); // Treat as not found if ID is not a valid number
    return null;
  }

  const player = getPlayerById(playerIdNum);

  if (!player) {
    // getPlayerById might have logged an error if ID was NaN or playerData was corrupt
    // If player is simply not found for a valid ID, notFound() is appropriate.
    console.log(`Player with ID ${playerIdNum} not found. This might be expected if the ID doesn't exist.`);
    notFound();
    return null;
  }

  // Placeholder for performance data - you'll expand this
  const performanceMetrics = [
    { metric: 'Touchdowns', value: 'N/A' },
    { metric: 'Rushing Yards', value: 'N/A' },
    { metric: 'Receiving Yards', value: 'N/A' },
    { metric: 'Tackles', value: 'N/A' },
    { metric: 'Interceptions', value: 'N/A' },
    // Add more relevant metrics based on player position and available data
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header and Footer are removed as per user's preference on the main roster page.
          If you want them on this individual player page, you'll need to:
          1. Uncomment the import lines below.
          2. Uncomment the <Header /> and <Footer /> components in the JSX.
          Ensure the paths in the imports are correct (e.g., using '@/components/...').
      */}
      {/* import Header from '@/components/Header'; */}
      {/* import Footer from '@/components/Footer'; */}
      {/* <Header /> */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
            {/* Player image display was removed in previous steps */}
            <div className="text-center md:text-left md:w-full"> {/* Ensure layout is fine without image */}
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
              Performance data is currently a placeholder. You'll need to integrate your actual data source for real statistics.
            </p>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default PlayerPerformancePage;
