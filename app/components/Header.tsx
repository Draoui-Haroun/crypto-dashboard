"use client";

import { useTheme } from "@/context/themeContext";
import { Dispatch, SetStateAction } from "react";

type HeaderProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

export default function Header({ search, setSearch }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-[var(--border)] bg-[var(--header-bg)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        
        <h1 className="shrink-0 text-xl font-bold text-[var(--text)]">
          CryptoDash
        </h1>

        <div className="flex min-w-0 items-center gap-4">
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            aria-label="Search cryptocurrencies"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full min-w-0 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--text)] outline-none placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)] sm:w-[300px]"
          />

          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--text)] transition hover:bg-[var(--primary)] focus:ring-[var(--primary)]"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}