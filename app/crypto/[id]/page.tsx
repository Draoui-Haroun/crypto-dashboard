
import Link from "next/link";
import { getCryptos } from "@/lib/api";

type CryptoDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CryptoDetails({params}: CryptoDetailsProps) {
  
    const { id } = await params;
    const cryptos = await getCryptos();
    const crypto = cryptos.find((coin) => coin.id === id);

  if (!crypto) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--text)]">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--primary)]"
          >
            ← Back to Dashboard
          </Link>

          <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
            <h1 className="text-2xl font-bold">
              Cryptocurrency not found
            </h1>

            <p className="mt-2 text-[var(--text-secondary)]">
              The cryptocurrency you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const isPositive = crypto.change24h >= 0;

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--text)]">
      <div className="mx-auto max-w-5xl">

        <Link
          href="/"
          className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--primary)]"
        >
          ← Back to Dashboard
        </Link>

        <section className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">
              <img
                src={crypto.image}
                alt={crypto.name}
                className="h-16 w-16 rounded-full"
              />

              <div>
                <h1 className="text-2xl font-bold md:text-3xl">
                  {crypto.name}
                </h1>

                <p className="mt-1 text-sm uppercase text-[var(--text-secondary)]">
                  {crypto.symbol}
                </p>
              </div>
            </div>

            <div className="sm:text-right">
              <p className="text-3xl font-bold md:text-4xl">
                ${crypto.price.toLocaleString()}
              </p>

              <p
                className={`mt-2 font-semibold ${
                  isPositive
                    ? "text-[var(--positive)]"
                    : "text-[var(--negative)]"
                }`}
              >
                {isPositive ? "+" : ""}
                {crypto.change24h}%
              </p>
            </div>

          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-5">
              <p className="text-sm text-[var(--text-secondary)]">
                Market Cap
              </p>

              <p className="mt-2 text-xl font-semibold">
                ${crypto.marketCap.toLocaleString()}
              </p>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-5">
              <p className="text-sm text-[var(--text-secondary)]">
                24h Volume
              </p>

              <p className="mt-2 text-xl font-semibold">
                ${crypto.volume24h.toLocaleString()}
              </p>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}