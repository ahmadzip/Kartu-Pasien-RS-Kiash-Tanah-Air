import DarkModeToggle from "../_components/DarkMode";
import ChangelogPopup from "../_components/ChangelogPopup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
    </>
  );
}
