import Image from "next/image";
import Container from "@/components/container";
import { TopNav } from "@/components/nav";

export default function WorkoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav
        title={
          <Image
            src="/powerlogo.avif"
            alt="Power Logo"
            width={180}
            height={180}
            className="object-contain"
          />
        }
      />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}
