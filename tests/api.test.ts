
import { test, expect, vi, afterEach } from "vitest";
import { getCryptos } from "@/lib/api";
import { after } from "node:test";

test("returns cryptocurrencies from API", async () => {
  afterEach(() => vi.restoreAllMocks())
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        image: "bitcoin.png",
        current_price: 100000,
        price_change_percentage_24h: 2.5,
        market_cap: 200000000,
        total_volume: 500000000,
      },
    ],
  });

  const result = await getCryptos();

  expect(result).toEqual([
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "btc",
      image: "bitcoin.png",
      price: 100000,
      change24h: 2.5,
      marketCap: 200000000,
      volume24h: 500000000,
    },
  ]);
});

test("throws error when API fails", async () => {
  afterEach(() => vi.restoreAllMocks)
  global.fetch = vi.fn().mockResolvedValue({
    ok: false, status: 500,
  });
  await expect(getCryptos()).rejects.toThrow("Failed to fetch cryptocurrencies");
})

test("throws error when network fails", async () => {
  afterEach(() => vi.restoreAllMocks)
  global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));
  await expect(getCryptos()).rejects.toThrow("Network error");
})

test("returns empty array when API returns no cryptocurrencies", async () => {
  afterEach(() => vi.restoreAllMocks)
  global.fetch = vi.fn().mockResolvedValue({
    ok: true, json: async () => []
  });

  const resrult = await getCryptos()
  expect(resrult).toEqual([])
})