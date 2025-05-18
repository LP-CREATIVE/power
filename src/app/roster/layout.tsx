import Container from "@/components/container";
import { TopNav } from "@/components/nav";

export default function RosterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav title="Ticket" />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}
