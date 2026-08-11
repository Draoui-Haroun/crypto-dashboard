
import { CryptoCoin } from "@/types/crypto";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip } from "recharts";

type MarketCapChartProps = {
    cryptos: CryptoCoin[];
}

export default function MarketCapChart({cryptos}:MarketCapChartProps){

    const chartData = [...cryptos].sort((a,b)=>b.marketCap - a.marketCap).slice(0, 10).map((crypto)=>({
        name: crypto.name, marketCap: crypto.marketCap,
    }))

     return (
    <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <h2 className="mb-6 text-lg font-semibold text-[var(--text)]">
        Top 10 by Market Cap
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <XAxis
            dataKey="name"
            tick={{ fill: "var(--text-secondary)" }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tick={{ fill: "var(--text-secondary)" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) =>
              `$${(value / 1_000_000_000).toFixed(0)}B`
            }
          />

          <Tooltip
            formatter={(value) =>
              `$${Number(value).toLocaleString()}`
            }
            labelStyle={{
              color: "var(--text)",
            }}
          />

          <Bar
            dataKey="marketCap"
            fill="var(--primary)"
            radius={[6, 6, 0, 0]}
            barSize={35}
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}