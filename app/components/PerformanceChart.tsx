
import { CryptoCoin } from "@/types/crypto";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip, Cell } from "recharts";

type PerformanceChartProps = {
    cryptos: CryptoCoin[];
}

export default function PerformanceChart({cryptos}: PerformanceChartProps) {

    const gainers = [...cryptos].sort((a, b) => b.change24h - a.change24h).slice(0, 5);
    const losers = [...cryptos].sort((a, b) => a.change24h - b.change24h).slice(0, 5).reverse();

    const chartData = [...gainers, ...losers].map((crypto) => ({
        name: crypto.name, change24h: crypto.change24h,
    }));

    return(
        
        <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="mb-6 text-lg font-semibold text-[var(--text)]">
            24h Performance ( 5 top gainers / losers )
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
                    `${value}%`
                }
                />
    
                <Tooltip
                formatter={(value) => `${Number(value)}%`}
                labelStyle={{
                    color: "var(--text)",
                }}
                />
    
                <Bar
                dataKey="change24h"   
                radius={[6, 6, 6, 6]}
                barSize={35}
                >
                {chartData.map((crypto) => (
                    <Cell
                    key={crypto.name}
                    fill={
                        crypto.change24h >= 0
                        ? "var(--positive)"
                        : "var(--negative)"
                    }
                    />
                ))}
                </Bar>
            </BarChart>
            </ResponsiveContainer>
        </section>
    )
}