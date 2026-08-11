
"use client"

type SearchFilterProps = {
  filter: string;
  setFilter: (filter: string) => void;
  sort: string;
  setSort: (sort: string) => void;
};

export default function SearchFilter({filter, setFilter, sort, setSort}: SearchFilterProps) {

    return(
        <div className="flex flex-wrap items-center gap-2">
            <button
                onClick={() => setFilter("all")}
                aria-pressed={filter === "all"}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                filter === "all"
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--surface)] text-[var(--text-secondary)]"
                } focus:ring-[var(--primary)]`}
            >
                All
            </button>

            <button
                onClick={() => setFilter("gainers")}
                aria-pressed={filter === "gainers"}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                filter === "gainers"
                    ? "bg-[var(--positive)] text-white"
                    : "bg-[var(--surface)] text-[var(--text-secondary)]"
                } focus:ring-[var(--primary)]`}
            >
                Gainers
            </button>

            <button
                onClick={() => setFilter("losers")}
                aria-pressed={filter === "losers"}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                filter === "losers"
                    ? "bg-[var(--negative)] text-white"
                    : "bg-[var(--surface)] text-[var(--text-secondary)]"
                } focus:ring-[var(--primary)]`}
            >
                Losers
            </button>
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full sm:w-auto rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-[var(--text)]"
                aria-label="Sort cryptocurrencies"
                >
                <option value="default">Default</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="name-asc">Name: A → Z</option>
                <option value="name-desc">Name: Z → A</option>
            </select>
        </div>

    )
}