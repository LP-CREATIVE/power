import Link from "next/link";
import Image from "next/image";

export default function VisActor() {
  return (
    <Link
      href="https://power-pink.vercel.app/"
      target="_blank"
      className="relative my-2 flex flex-col items-center justify-center gap-y-2 px-4 py-4"
    >
      <div className="dot-matrix absolute left-0 top-0 -z-10 h-full w-full" />
      <span className="text-xs text-muted-foreground">Powered by</span>
      <div className="flex items-center space-x-2">
        <Image
          src="/powerlogo.png"
          alt="Power Logo"
          width={24}
          height={24}
        />
        <span className="text-md text-accent-foreground">Power</span>
      </div>
    </Link>
  );
}
