
import {test, expect, vi} from "vitest";
import {render, screen} from "@testing-library/react"
import MarketCapChart from "@/app/components/MarketCapChart";
import { CryptoCoin } from "@/types/crypto";
import React from "react";

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

test("renders market cap chart", () => {
    render(<MarketCapChart cryptos={cryptos} />)
    expect(screen.getByText("Top 10 by Market Cap")).toBeInTheDocument();
})

