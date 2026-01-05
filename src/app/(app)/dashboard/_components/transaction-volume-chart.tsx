'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '@/lib/utils';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type ChartData = {
    date: string;
    volume: number;
}

interface TransactionVolumeChartProps {
  data: ChartData[];
}

const chartConfig = {
  volume: {
    label: "Volume",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function TransactionVolumeChart({ data }: TransactionVolumeChartProps) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
            tickFormatter={(value) => formatCurrency(value as number).slice(0, -4) + 'k'}
          />
           <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="volume" fill="var(--color-volume)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
