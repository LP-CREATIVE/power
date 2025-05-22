// src/app/roster/[number]/page.tsx
export default function PlayerPage({ params }: { params: { number: string } }) {
  // The 'number' for the player is now available as params.number
  // You can use it to fetch and display player-specific data.

  return (
    <>
      {/* Example: Displaying the player number */}
      <h1>Player Performance Sheet for ID: {params.number}</h1>
      <div className="p-4">
        {/* You'll add the logic here to display data for player params.number */}
        <p>Details for player {params.number} will go here.</p>
      </div>
    </>
  );
}
