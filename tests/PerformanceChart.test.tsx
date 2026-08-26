

import {test, expect} from "vitest"
import {render, screen} from "@testing-library/react"
import PerformanceChart from "@/app/components/PerformanceChart"
import { CryptoCoin } from "@/types/crypto"

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
]

test("renders performance chart", () => {
    render(<PerformanceChart cryptos={cryptos} />)
    expect(screen.getByText("24h Performance ( 5 top gainers / losers )")).toBeInTheDocument();
})