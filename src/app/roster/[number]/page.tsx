// src/app/roster/[number]/page.tsx

// Define a specific interface for this page's props
interface PlayerDetailsPageProps {
  params: { number: string }; // 'number' comes from your folder name [number]
  searchParams?: { [key: string]: string | string[] | undefined }; // Standard Next.js prop
}

export default function PlayerPage({ params, searchParams }: PlayerDetailsPageProps) {
  // The 'number' for the player is now available as params.number
  // You can use it to fetch and display player-specific data.

  return (
    <>
      <h1>Player Performance Sheet for ID: {params.number}</h1>
      <div className="p-4">
        <p>Details for player {params.number} will go here.</p>
        {/* You can access searchParams if needed, e.g., searchParams?.someQuery */}
      </div>
    </>
  );
}
