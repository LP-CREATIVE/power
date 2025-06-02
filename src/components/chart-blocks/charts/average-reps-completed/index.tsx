"use client";

import { useAtomValue } from "jotai";
import { FilePlus2 } from "lucide-react";
import { repChartDataAtom } from "@/lib/atoms";
import type { RepMetric } from "@/types/types";
import ChartTitle from "../../components/chart-title";
import Chart from "./chart";
import { DatePickerWithRange } from "./components/date-range-picker";
import MetricCard from "./components/metric-card";

const calMetricCardValue = (
  data: RepMetric[],
  type: "assigned" | "completed",
) => {
  const filteredData = data.filter((item) => item.type === type);
  return Math.round(
    filteredData.reduce((acc, curr) => acc + curr.count, 0) /
      filteredData.length,
  );
};

export default function AverageRepsAssigned() {
  const RepChartData = useAtomValue(repChartDataAtom);
  const avgAssigned = calMetricCardValue(repChartData, "assigned");
  const avgCompleted = calMetricCardValue(repChartData, "completed");

  return (
    <section className="flex h-full flex-col gap-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <ChartTitle title="Average Completed Reps" icon={FilePlus2} />
        <DatePickerWithRange className="" />
      </div>
      <div className="flex flex-wrap">
        <div className="my-4 flex w-52 shrink-0 flex-col justify-center gap-6">
          <MetricCard
            title="Total Assigned Reps"
            value={avgAssigned}
            color="#000000"
          />
          <MetricCard
            title="Total Completed Reps"
            value={avgCompleted}
            color="#FF0000"
          />
        </div>
        <div className="relative h-96 min-w-[320px] flex-1">
          <Chart />
        </div>
      </div>
    </section>
  );
}

