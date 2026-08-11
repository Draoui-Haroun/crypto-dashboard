
import { CryptoCoin } from "@/types/crypto";
import { useWatchlist } from "@/context/WatchlistContext";
import Link from "next/link";

type WatchlistProps = {
    cryptos: CryptoCoin[];
};

export default function Watchlist({cryptos}: WatchlistProps) {

    const {watchlist, toggleWatchlist} = useWatchlist();
    const watchlistedCryptos = cryptos.filter((crypto) => watchlist.includes(crypto.id))

    return (
        <section className="mx-auto mt-8 max-w-7xl px-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-lg font-semibold text-[var(--text)]">
            ⭐ My Watchlist
            </h2>

            {watchlistedCryptos.length === 0 ? (
            <div className="py-10 text-center">
                <div className="text-4xl">☆</div>

                <h3 className="mt-3 font-semibold text-[var(--text)]">
                    Your watchlist is empty
                </h3>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    Add cryptocurrencies to quickly track their price and performance.
                </p>
                </div>
            ) : (
            <div className="mt-6 space-y-3">
                {watchlistedCryptos.map((crypto) => (
                <div
                    key={crypto.id}
                    className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--background)] p-4"
                >
                    <div className="flex items-center gap-3">
                    <img
                        src={crypto.image}
                        alt={crypto.name}
                        className="h-9 w-9 rounded-full"
                    />

                    <div>
                        <Link
                        href={`/crypto/${crypto.id}`}
                        className="font-semibold text-[var(--text)] hover:text-[var(--primary)]"
                        >
                        {crypto.name}
                        </Link>

                        <p className="text-xs uppercase text-[var(--text-muted)]">
                        {crypto.symbol}
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="font-medium text-[var(--text)]">
                        ${crypto.price.toLocaleString()}
                        </p>

                        <p
                        className={`text-sm font-semibold ${
                            crypto.change24h >= 0
                            ? "text-[var(--positive)]"
                            : "text-[var(--negative)]"
                        }`}
                        >
                        {crypto.change24h >= 0 ? "+" : ""}
                        {crypto.change24h}%
                        </p>
                    </div>

                    <button
                        onClick={() => toggleWatchlist(crypto.id)}
                        className="text-xl transition hover:scale-110 focus:ring-[var(--primary)]"
                        aria-label={`Remove ${crypto.name} from watchlist`}
                    >
                        ★
                    </button>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
        </section>
    );
}