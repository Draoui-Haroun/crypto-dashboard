
import { CryptoCoin } from "@/types/crypto";
import { useMemo } from "react";
import Link from "next/link";
import { useWatchlist } from "@/context/WatchlistContext";

type CryptoTableProps = {
  cryptos: CryptoCoin[];
  search: string;
  filter: string;
  sort: string;
};

export default function CryptoTable({cryptos, search, filter, sort}: CryptoTableProps) {

  const {toggleWatchlist, isInWatchlist} = useWatchlist();

  const filteredCrypto = useMemo(() => {
    return cryptos.filter((crypto) => {
      const matchesSearch =
        crypto.name.toLowerCase().includes(search.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "gainers" && crypto.change24h >= 0) ||
        (filter === "losers" && crypto.change24h < 0);

      return matchesFilter && matchesSearch;
    });
  }, [cryptos, search, filter]);

  const sortedCrypto = useMemo(() => {
    return [...filteredCrypto].sort((a,b) => {
      if (sort === "price-low"){
      return a.price - b.price
    }

    if (sort === "price-high"){
      return b.price - a.price
    }

    if (sort === "name-asc"){
      return a.name.localeCompare(b.name)
    }

    if (sort === "name-desc"){
      return b.name.localeCompare(a.name);
    }

    return 0;
    })
  }, [filteredCrypto, sort])

  return (
    <section className="mt-8">
      <div className="overflow-x-auto rounded-xl border border-[var(--border)] overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse min-w-[800px] w-full">
          <thead>
            <tr className="bg-[var(--surface)]">
              <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-[var(--text-secondary)]">
                Coin
              </th>

              <th scope="col" className="px-6 py-4 text-right text-sm font-medium text-[var(--text-secondary)]">
                Price
              </th>

              <th scope="col" className="px-6 py-4 text-right text-sm font-medium text-[var(--text-secondary)]">
                24h %
              </th>

              <th scope="col" className="px-6 py-4 text-right text-sm font-medium text-[var(--text-secondary)]">
                Market Cap
              </th>

              <th scope="col" className="px-6 py-4 text-right text-sm font-medium text-[var(--text-secondary)]">
                Volume
              </th>
              <th scope="col" className="px-4 py-4 text-center text-sm font-medium text-[var(--text-secondary)]">
                Watchlist
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedCrypto.length > 0 ? (
              sortedCrypto.map((crypto) => (
                <tr
                  key={crypto.id}
                  className="border-t border-[var(--border)] bg-[var(--background)] transition hover:bg-[var(--surface-hover)]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={crypto.image}
                        alt={crypto.name}
                        className="h-9 w-9 rounded-full"
                      />

                      <div>
                        <Link href={`/crypto/${crypto.id}`} className="font-semibold text-[var(--text)] hover:text-[var(--primary)]">
                          {crypto.name}
                        </Link>

                        <p className="text-xs uppercase text-[var(--text-muted)]">
                          {crypto.symbol}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right font-medium text-[var(--text)]">
                    ${crypto.price.toLocaleString()}
                  </td>

                  <td
                    className={`px-6 py-4 text-right font-semibold ${
                      crypto.change24h >= 0
                        ? "text-[var(--positive)]"
                        : "text-[var(--negative)]"
                    }`}
                  >
                    {crypto.change24h >= 0 ? "+" : ""}
                    {crypto.change24h}%
                  </td>

                  <td className="px-6 py-4 text-right text-[var(--text-secondary)]">
                    ${crypto.marketCap.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-right text-[var(--text-secondary)]">
                    ${crypto.volume24h.toLocaleString()}
                  </td>

                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => toggleWatchlist(crypto.id)}
                      className="text-xl transition hover:scale-110"
                      aria-label={
                        isInWatchlist(crypto.id)
                          ? `Remove ${crypto.name} from watchlist`
                          : `Add ${crypto.name} to watchlist`
                      }
                    >
                      {isInWatchlist(crypto.id) ? "★" : "☆"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-[var(--text-secondary)]"
                >
                  No cryptocurrencies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
