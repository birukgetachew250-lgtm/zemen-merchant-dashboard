'use client';

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface OnboardingChartProps {
    data: {
        total: number;
        approved: number;
        pending: number;
        rejected: number;
    }
}

export function OnboardingChart({ data }: OnboardingChartProps) {
    const chartData = [
        { status: "Approved", value: data.approved, fill: "var(--color-approved)" },
        { status: "Pending", value: data.pending, fill: "var(--color-pending)" },
        { status: "Rejected", value: data.rejected, fill: "var(--color-rejected)" },
    ]

    const chartConfig = {
      value: {
        label: "Value",
      },
      approved: {
        label: "Approved",
        color: "hsl(var(--chart-2))",
      },
      pending: {
        label: "Pending",
        color: "hsl(var(--chart-4))",
      },
      rejected: {
        label: "Rejected",
        color: "hsl(var(--destructive))",
      },
    } satisfies ChartConfig

  return (
    <div className="w-full">
      <ChartContainer config={chartConfig}>
        <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="value" layout="vertical" radius={5}>
            <LabelList
              dataKey="status"
              position="insideLeft"
              offset={8}
              className="fill-[--color-label] text-white"
              fontSize={12}
            />
            <LabelList
              dataKey="value"
              position="right"
              offset={8}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
      <CardDescription className="text-center mt-4">Total Onboarding Requests: {data.total}</CardDescription>
    </div>
  )
}
