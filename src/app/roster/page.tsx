import React from 'react';
import Link from 'next/link';
import { playerData, Player } from '@/lib/data'; 

const RosterPage = () => {
  return (
    <div className="min-h-screen bg-[#111111] text-white py-8">
      <main className="container mx-auto px-4 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-12 text-[#FF3B3B]">Team Roster</h1>
        <div className="overflow-x-auto rounded-lg shadow-xl border border-[#FF3B3B]/30">
          <table className="min-w-full bg-[#1a1a1a]">
            <thead className="bg-[#1F1F1F] border-b border-[#FF3B3B]/20">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Number</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Height</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {playerData.map((player: Player) => (
                <tr key={player.id} className="hover:bg-[#2a2a2a] transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/roster/${player.id}`}
                      className="text-sm font-medium text-[#FF3B3B] hover:text-white hover:underline"
                    >
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
        {playerData.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No players on the roster yet.</p>
        )}
      </main>
    </div>
  );
};

export default RosterPage;
