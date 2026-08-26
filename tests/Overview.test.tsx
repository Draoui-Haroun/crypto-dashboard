
import {test, expect} from "vitest"
import { CryptoCoin } from "@/types/crypto";
import Overview from "@/app/components/Overview";
import { render, screen } from "@testing-library/react";

const cryptos: CryptoCoin[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    image: "bitcoin.jpg",
    price: 100000,
    change24h: +2.5,
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

const negativeCryptos: CryptoCoin[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    image: "bitcoin.jpg",
    price: 100000,
    change24h: -4,
    marketCap: 200000000,
    volume24h: 500000000,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "eth",
    image: "ethereum.jpg",
    price: 3000,
    change24h: -2,
    marketCap: 100000000,
    volume24h: 200000000,
  },
];

test("calculates overview statistics", () => {
    render(
        <Overview cryptos={cryptos} />
    )
    expect(screen.getByText("$300,000,000")).toBeInTheDocument();
    expect(screen.getByText("$700,000,000")).toBeInTheDocument();
    expect(screen.getByText("+0.50%")).toBeInTheDocument();
})

test("shows negative market change", () => {
    render(
        <Overview cryptos={negativeCryptos} />
    );
    expect(screen.queryByText("-3.00%")).toBeInTheDocument();
})

test("handles empty cryptocurrencies", () => {
  render(<Overview cryptos={[]} />);

  expect(screen.getAllByText("$0")).toHaveLength(2);
  const marketChange = screen.getByText("Market Change").nextElementSibling;
  expect(marketChange).toHaveTextContent("+0.00%");
});
