import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/themeContext";
import { WatchlistProvider } from "@/context/WatchlistContext";

export const metadata: Metadata = {
  title: "Crypto Dashboard",
  description: "A modern cryptocurrency market dashboard built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <WatchlistProvider>
            {children}
          </WatchlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}