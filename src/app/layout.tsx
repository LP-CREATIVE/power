import type { Metadata } from "next";
import { SideNav } from "@/components/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import "@/style/globals.css";
import { Providers } from "./providers";
import { Gabarito } from "next/font/google";

const gabarito = Gabarito({ subsets: ["latin"], variable: "--font-gabarito" });

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico", // ✅ This ensures your favicon loads
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
   <body className={cn("bg-background font-sans", gabarito.variable)}>

        <Providers>
          <div className="flex min-h-[100dvh]">
            <SideNav />
            <div className="flex-grow overflow-auto">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
