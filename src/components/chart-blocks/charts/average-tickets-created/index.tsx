"use client";

import { useAtomValue } from "jotai";
import { FilePlus2 } from "lucide-react";
import { ticketChartDataAtom } from "@/lib/atoms";
import type { TicketMetric } from "@/types/types";
import ChartTitle from "../../chart-title";

import Chart from "./chart";
import { DatePickerWithRange } from "./components/date-range-picker";
import MetricCard from "./components/metric-card";

const calMetricCardValue = (
  data: TicketMetric[],
  type: "Total" | "Completed"
): number => {
  const filteredData = data.filter((item) => item.type === type);
  if (filteredData.length === 0) return 0;
  return Math.round(
    filteredData.reduce((acc, curr) => acc + curr.count, 0) /
      filteredData.length
  );
};

export default function AverageTicketsCreated() {
  const ticketChartData = useAtomValue(ticketChartDataAtom);
  const avgCreated = calMetricCardValue(ticketChartData, "Total");
  const avgResolved = calMetricCardValue(ticketChartData, "Completed");

  return (
    <section className="flex h-full flex-col gap-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <ChartTitle title="Weekly Performance Report" icon={FilePlus2} />
        <DatePickerWithRange className="" />
      </div>
      <div className="flex flex-wrap">
        <div className="my-4 flex w-52 shrink-0 flex-col justify-center gap-6">
          <MetricCard
            title="Total Reps Tracked"
            value={avgCreated}
            color="#60C2FB"
          />
          <MetricCard
            title="Effective Reps Completed"
            value={avgResolved}
            color="#3161F8"
          />
        </div>
        <div className="relative h-96 min-w-[320px] flex-1">
          <Chart />
        </div>
      </div>
    </section>
  );
}
