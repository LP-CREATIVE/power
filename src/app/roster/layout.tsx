import Container from "@/components/container";
import { TopNav } from "@/components/nav";
import Image from "next/image";

export default function RosterLayout({
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
  );
}
