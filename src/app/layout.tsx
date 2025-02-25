import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import DarkModeToggle from "./_components/DarkMode";
import ChangelogPopup from "./_components/ChangelogPopup";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "RS Kisah Tanah Air",
  description: "Pembuatan kartu pasien RS Kisah Tanah Air",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <header className="p-4 dark:bg-[#19222C] dark:text-white">
          <DarkModeToggle />
        </header>
        <main className="flex-grow">
          {children}
          <ChangelogPopup />
        </main>
        <footer className="text-center py-4 sticky bottom-0 dark:bg-[#19222C] dark:text-white">
          Made with ❤️ by Juned Hamilton
        </footer>
      </body>
    </html>
  );
}
