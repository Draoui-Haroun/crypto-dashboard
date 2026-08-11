
import { CryptoCoin } from "@/types/crypto";

export async function getCryptos() : Promise<CryptoCoin[]> {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false");
  
    if (!response.ok){
        throw new Error("Failed to fetch cryptocurrencies")
    }

    const data = await response.json();

    return data.map((crypto:any) => ({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        image: crypto.image,
        price: crypto.current_price,
        change24h: crypto.price_change_percentage_24h,
        marketCap: crypto.market_cap,
        volume24h: crypto.total_volume,
    }))
}
