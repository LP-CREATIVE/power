export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Player ID: {params.id}</h1>
    </div>
  );
}
