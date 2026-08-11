
"use client"
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Overview from "./components/Overview";
import CryptoTable from "./components/CryptoTable";
import SearchFilter from "./components/SearchFilter";
import { getCryptos } from "@/lib/api";
import { CryptoCoin } from "@/types/crypto";
import MarketCapChart from "./components/MarketCapChart";
import PerformanceChart from "./components/PerformanceChart";
import Footer from "./components/Footer";
import Watchlist from "./components/Watchlist";

export default function Home() {

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default')

  const [cryptos, setCryptos] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchCryptos() {
    try {
      setLoading(true);
      setError("");

      const data = await getCryptos();
      setCryptos(data);
    } catch (error) {
      setError("Failed to load cryptocurrencies.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCryptos();
  }, []);


  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <Header 
        search={search}
        setSearch={setSearch}
      />
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
        <Overview
          cryptos={cryptos}
        />
        <Watchlist cryptos={cryptos} />
        <SearchFilter
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
        />
        <button
          onClick={fetchCryptos}
          disabled={loading}
          className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)] transition duration-200 hover:bg-[var(--surface-hover)] hover:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
        {loading && (
          <p className="py-10 text-center text-[var(--text-secondary)]">
            Loading cryptocurrencies...
          </p>
        )}
        {error && (
          <p className="py-10 text-center text-[var(--negative)]">
            {error}
          </p>
        )}
        {!loading && !error &&(
          <CryptoTable
            cryptos={cryptos}
            search={search}
            filter={filter}
            sort={sort}
          />
        )}
        <MarketCapChart cryptos={cryptos} />
        <PerformanceChart cryptos={cryptos} />
      </div>
      <Footer />
    </main>
  );
}