// src/components/IMUGraph.tsx
"use client";

import { useEffect, useState } from "react";
import { VChart } from "@visactor/react-vchart";
import type { ILineChartSpec } from "@visactor/vchart";
import { supabaseClient } from "@/lib/supabaseClient";

type IMUSample = {
  timestamp: string;
  ax: number;
  ay: number;
  az: number;
  gx: number;
  gy: number;
  gz: number;
};

export default function IMUGraph() {
  const [chartData, setChartData] = useState<
    Array<{ timestamp: string; axis: string; value: number }>
  >([]);

  useEffect(() => {
    supabaseClient
      .from("imu_samples")
      .select("timestamp, ax, ay, az, gx, gy, gz")
      .order("timestamp", { ascending: true })
      .limit(1000)
      .then(({ data, error }) => {
        if (error || !data) {
          console.error("Supabase fetch error:", error);
          return;
        }
        const rows = data as IMUSample[];
        const flattened = rows.flatMap((row) => {
          const ts = new Date(row.timestamp).toLocaleTimeString("en-US", {
            hour12: false,
          });
          return [
            { timestamp: ts, axis: "ax", value: row.ax },
            { timestamp: ts, axis: "ay", value: row.ay },
            { timestamp: ts, axis: "az", value: row.az },
            { timestamp: ts, axis: "gx", value: row.gx },
            { timestamp: ts, axis: "gy", value: row.gy },
            { timestamp: ts, axis: "gz", value: row.gz },
          ];
        });
        setChartData(flattened);
      });
  }, []);

  const spec: ILineChartSpec = {
    type: "line",
    data: [
      {
        id: "imuData",
        values: chartData,
      },
    ],
    xField: "timestamp",
    yField: "value",
    seriesField: "axis",
  };

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
      <VChart spec={spec} />
    </div>
  );
}

