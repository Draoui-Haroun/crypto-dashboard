

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

        <p className="text-sm text-[var(--text-secondary)]">
          © 2026 CryptoDash. All rights reserved.
        </p>

        <p className="text-sm text-[var(--text-muted)]">
          Built with Next.js & TypeScript
        </p>

      </div>
    </footer>
  );
}