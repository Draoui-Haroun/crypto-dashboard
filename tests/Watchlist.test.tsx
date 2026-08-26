
import Watchlist from "@/app/components/Watchlist";
import {render, screen, waitFor} from "@testing-library/react"
import {test, expect} from "vitest"
import { CryptoCoin } from "@/types/crypto";
import { WatchlistProvider } from "@/context/WatchlistContext";
import userEvent from "@testing-library/user-event";
import { useWatchlist } from "@/context/WatchlistContext";


const cryptos: CryptoCoin[] = [
    {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        image: "bitcoin.jpg",
        price: 100000,
        change24h: 2.5,
        marketCap: 200000000,
        volume24h: 500000000,
    },
]

test("shows empty watchlist message", () => {
    render(
        <WatchlistProvider>
            <Watchlist cryptos={cryptos} />
        </WatchlistProvider>
    )

    expect(screen.getByText("Your watchlist is empty")).toBeInTheDocument();
    expect(screen.getByText("Add cryptocurrencies to quickly track their price and performance.")).toBeInTheDocument();
})

test("shows watchlisted cryptocurrencies", async () => {
  const user = userEvent.setup();

  function TestComponent() {
    const { toggleWatchlist } = useWatchlist();

    return (
      <button onClick={() => toggleWatchlist("bitcoin")}>
        Add Bitcoin
      </button>
    );
  }

  render(
    <WatchlistProvider>
      <TestComponent />
      <Watchlist cryptos={cryptos} />
    </WatchlistProvider>
  );

  await user.click(screen.getByRole("button", { name: "Add Bitcoin" }));

  expect(screen.getByText("Bitcoin")).toBeInTheDocument();
  expect(screen.getByText("$100,000")).toBeInTheDocument();
  expect(screen.getByText("+2.5%")).toBeInTheDocument();
});

test("removes cryptocurrency from watchlist", async () => {
  const user = userEvent.setup();

  function TestComponent() {
    const { toggleWatchlist } = useWatchlist();

    return (
      <button onClick={() => toggleWatchlist("bitcoin")}>
        Toggle Bitcoin
      </button>
    );
  }

  render(
    <WatchlistProvider>
      <TestComponent />
      <Watchlist cryptos={cryptos} />
    </WatchlistProvider>
  );

  await user.click(screen.getByRole("button", { name: "Toggle Bitcoin" }));
  expect(screen.getByText("Bitcoin")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Toggle Bitcoin" }));
  expect(screen.getByText("Your watchlist is empty")).toBeInTheDocument();
  expect(screen.queryByText("Bitcoin")).not.toBeInTheDocument();
});

