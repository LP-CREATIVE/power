// src/app/roster/[playerId]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation'; // To handle player not found
import Header from '@/components/Header'; // Updated path using alias
import Footer from '@/components/Footer'; // Updated path using alias
import { getPlayerById, Player } from '@/lib/data'; // Updated path using alias

// Props for the page component, params will contain playerId
interface PlayerPageProps {
  params: {
    playerId: string; // The dynamic segment from the URL, will be a string
  };
}

// This is a Server Component by default in Next.js App Router

// Optional: Generate static paths at build time if you know all player IDs
// This can improve performance for static site generation (SSG)
// import { playerData } from '@/lib/data'; // If you uncomment this, use alias too
// export async function generateStaticParams() {
//   return playerData.map((player) => ({
//     playerId: player.id.toString(),
//   }));
// }

const PlayerPerformancePage = ({ params }: PlayerPageProps) => {
  const playerId = parseInt(params.playerId, 10); // Convert string ID from URL to number

  // Fetch the player data using the helper function
  const player = getPlayerById(playerId);

  // If player is not found, display a 404 page
  if (!player) {
    notFound(); // This will render the nearest not-found.tsx or a default Next.js 404 page
    return null; // Or return a custom "Player not found" component
  }

  // Placeholder for performance data - you'll expand this
  // In a real application, you might fetch this from an API or include it in your player data
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
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
          {/* Player basic info section */}
          <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
            {/* Player image or placeholder */}
            {player.imageUrl ? (
              <img
                className="h-32 w-32 md:h-48 md:w-48 rounded-full object-cover border-4 border-yellow-400 mb-6 md:mb-0 md:mr-8"
                src={player.imageUrl}
                alt={player.name}
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.currentTarget as HTMLImageElement;
                  const nameForImage = player.name.split(" ").map(n => n[0]).join("");
                  target.src = `https://placehold.co/192x192/4A5568/FFFFFF?text=${nameForImage}`;
                  target.onerror = null; // Prevent infinite loop
                }}
              />
            ) : (
              <div className="h-32 w-32 md:h-48 md:w-48 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-5xl font-semibold border-4 border-yellow-400 mb-6 md:mb-0 md:mr-8">
                {player.name.split(" ").map(n => n[0]).join("")}
              </div>
            )}
            {/* Player details */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">{player.name}</h1>
              <p className="text-xl text-gray-300 mb-1">#{player.number} - {player.position}</p>
              <p className="text-md text-gray-400">{player.class} | {player.height} | {player.weight} lbs</p>
              {/* Hometown was removed, so it's not displayed here */}
            </div>
          </div>

          <hr className="my-8 border-gray-700" />

          {/* Performance metrics section */}
          <div>
            <h2 className="text-2xl font-semibold text-yellow-400 mb-6">Performance Overview</h2>
            {/* Grid for displaying performance stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {performanceMetrics.map(stat => (
                <div key={stat.metric} className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition-colors">
                  <p className="text-sm text-gray-400 uppercase tracking-wider">{stat.metric}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
              ))}
            </div>
            {/* Placeholder message for actual data integration */}
            <p className="mt-8 text-center text-gray-500 italic">
              Performance data is currently a placeholder. You'll need to integrate your actual data source for real statistics.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlayerPerformancePage;
