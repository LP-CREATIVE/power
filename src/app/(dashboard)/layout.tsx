import { TopNav } from "@/components/nav";
import Image from "next/image";

export default function DashboardLayout({
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
      <main>{children}</main>
    </>
  );
}
