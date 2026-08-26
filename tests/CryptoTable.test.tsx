

import {test, expect} from "vitest"
import {render, screen} from "@testing-library/react"
import { useWatchlist, WatchlistProvider } from "@/context/WatchlistContext"
import CryptoTable from "@/app/components/CryptoTable"
import { CryptoCoin } from "@/types/crypto"
import userEvent from "@testing-library/user-event"


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
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "eth",
    image: "ethereum.jpg",
    price: 3000,
    change24h: -1.5,
    marketCap: 100000000,
    volume24h: 200000000,
  },
];

test("renders cryptocurrencies", () => {
  render(
    <WatchlistProvider>
      <CryptoTable
        cryptos={cryptos}
        search=""
        filter="all"
        sort="default"
      />
    </WatchlistProvider>
  );

  expect(screen.getByText("Bitcoin")).toBeInTheDocument();
  expect(screen.getByText("Ethereum")).toBeInTheDocument();
});

test("filters cryptocurrencies by search", () => {
    render(
        <WatchlistProvider>
            <CryptoTable
            cryptos={cryptos}
            search="bitcoin"
            filter="all"
            sort="default"
            />
        </WatchlistProvider>
    )
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.queryByText("Ethereum")).not.toBeInTheDocument();
})

test("search cryptocurrencies be symbol", () => {
    render(
        <WatchlistProvider>
            <CryptoTable
            cryptos={cryptos}
            search="BTC"
            filter="all"
            sort="default"
            />
        </WatchlistProvider>
    )
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.queryByText("Ethereum")).not.toBeInTheDocument();
})

test("filter gainers", () => {
    render(
        <WatchlistProvider>
            <CryptoTable
            cryptos={cryptos}
            search=""
            filter="gainers"
            sort="default"
            />
        </WatchlistProvider>
    )

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.queryByText("Ethereum")).not.toBeInTheDocument();
})

test("filter losers", () => {
    render(
        <WatchlistProvider>
            <CryptoTable
            cryptos={cryptos}
            search=""
            filter="losers"
            sort="default"
            />
        </WatchlistProvider>
    )

    expect(screen.getByText("Ethereum")).toBeInTheDocument();
    expect(screen.queryByText("Bitcoin")).not.toBeInTheDocument();
})

test("sorts cryptocurrencies by price low to high", () => {
    
    render(
        <WatchlistProvider>
            <CryptoTable
            cryptos={cryptos}
            search=""
            filter="all"
            sort="price-low"
            />
        </WatchlistProvider>
    )
    const rows = screen.getAllByRole("row")
    expect(rows[1]).toHaveTextContent("Ethereum")
    expect(rows[2]).toHaveTextContent("Bitcoin")
})

test("sorts cryptocurrencies by price high to low", () => {
    render(
        <WatchlistProvider>
            <CryptoTable
            cryptos={cryptos}
            search=""
            filter="all"
            sort="price-high"
            />
        </WatchlistProvider>
    )

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Bitcoin")
    expect(rows[2]).toHaveTextContent("Ethereum")
})

test("sorts cryptocurrencies by name A to Z", () => {
    render(
        <WatchlistProvider>
            <CryptoTable
            cryptos={cryptos}
            search=""
            filter="all"
            sort="name-asc"
            />
        </WatchlistProvider>
    )
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Bitcoin");
    expect(rows[2]).toHaveTextContent("Ethereum")
})

test("sorts cryptocurrencies by name Z to A", () => {
    render(
        <WatchlistProvider>
            <CryptoTable
            cryptos={cryptos}
            search=""
            filter="all"
            sort="name-desc"
            />
        </WatchlistProvider>
    )
    const rows = screen.getAllByRole("row")
    expect(rows[1]).toHaveTextContent("Ethereum")
    expect(rows[2]).toHaveTextContent("Bitcoin")
})

function WatchlistStatus() {
    const {isInWatchlist} = useWatchlist();
    return(
        <div>
            {isInWatchlist("bitcoin") ? "in watchlist" : "not in watchlist"}
        </div>
    )
}

test("add bitcoin to watchlist", async () => {
  const user = userEvent.setup();
  render(
    <WatchlistProvider>
      <CryptoTable
        cryptos={cryptos}
        search=""
        filter="all"
        sort="default"
      />
    </WatchlistProvider>
  );
  const button = screen.getByRole("button", {
    name: "Add Bitcoin to watchlist",
  });
  await user.click(button);
  expect(screen.getByRole("button", {name: "Remove Bitcoin from watchlist"})).toBeInTheDocument();
});

test("remove bitcoin from watchlist", async () => {
    const user = userEvent.setup()
    render(
        <WatchlistProvider>
            <CryptoTable
            cryptos={cryptos}
            search=""
            filter="all"
            sort="default"
            />
        </WatchlistProvider>
    )
    await user.click(screen.getByRole("button", {name: "Add Bitcoin to watchlist"}));
    await user.click(screen.getByRole("button", {name: "Remove Bitcoin from watchlist"}));
    expect(screen.getByRole("button", {name: "Add Bitcoin to watchlist"})).toBeInTheDocument();
})

