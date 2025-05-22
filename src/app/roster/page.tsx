// src/app/roster/page.tsx

import React from 'react';
import Link from 'next/link'; // Import the Link component
import Header from '../../components/Header'; // Path from src/app/roster/page.tsx to src/components/
import Footer from '../../components/Footer'; // Path from src/app/roster/page.tsx to src/components/
import { playerData, Player } from '../../lib/data'; // Path from src/app/roster/page.tsx to src/lib/

// Component to display the roster page
const RosterPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-12 text-yellow-400">Team Roster</h1>
        <div className="overflow-x-auto rounded-lg shadow-xl">
          <table className="min-w-full bg-gray-800">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"></th> {/* Image */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Height</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Class</th>
                {/* Hometown removed as per previous request */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {playerData.map((player: Player) => (
                <tr key={player.id} className="hover:bg-gray-700 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Player image or placeholder */}
                    {player.imageUrl ? (
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={player.imageUrl}
                        alt={player.name}
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.currentTarget as HTMLImageElement;
                          const nameForImage = player.name.split(" ").map(n => n[0]).join("");
                          target.src = `https://placehold.co/48x48/666666/FFFFFF?text=${nameForImage}`;
                          target.onerror = null; // Prevent infinite loop if fallback also fails
                        }}
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-600 flex items-center justify-center text-gray-400 text-lg font-semibold">
                        {player.name.split(" ").map(n => n[0]).join("")}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Wrap player name with Link component to navigate to individual player page */}
                    <Link href={`/roster/${player.id}`} className="text-sm font-medium text-yellow-400 hover:text-yellow-300 hover:underline">
                        {player.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{player.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">{player.number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{player.height}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{player.weight} lbs</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{player.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Display message if no players are available */}
        {playerData.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No players on the roster yet.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RosterPage;
