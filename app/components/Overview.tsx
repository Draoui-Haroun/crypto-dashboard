
import { CryptoCoin } from "@/types/crypto";

type OverviewProps = {
  cryptos: CryptoCoin[];
};

export default function Overview({cryptos}: OverviewProps) {
  const totalMarketCap = cryptos
  .reduce(
    (total, crypto) => total + crypto.marketCap,
    0
  );

  const totalVolume = cryptos.reduce(
    (total, crypto) => total + crypto.volume24h,
    0
  );

  const marketChange =
    cryptos.length > 0
      ? cryptos.reduce(
          (total, crypto) => total + crypto.change24h,
          0
        ) / cryptos.length
      : 0;

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="text-sm text-[var(--text-secondary)]">
          Total Market Cap
        </p>

        <h2 className="mt-2 text-2xl font-bold text-[var(--text)]">
          ${totalMarketCap.toLocaleString()}
        </h2>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="text-sm text-[var(--text-secondary)]">
          24h Volume
        </p>

        <h2 className="mt-2 text-2xl font-bold text-[var(--text)]">
          ${totalVolume.toLocaleString()}
        </h2>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="text-sm text-[var(--text-secondary)]">
          Market Change
        </p>

        <h2
          className={`mt-2 text-2xl font-bold ${
            marketChange >= 0
              ? "text-[var(--positive)]"
              : "text-[var(--negative)]"
          }`}
        >
          {`${marketChange >= 0 ? "+" : ""}${marketChange.toFixed(2)}%`}
        </h2>
      </div>
    </section>
  );
}