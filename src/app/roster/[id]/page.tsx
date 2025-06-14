export default function Page({ params }: { params: { id: string } }) {
  return <h1>Dynamic Player: {params.id}</h1>;
}

