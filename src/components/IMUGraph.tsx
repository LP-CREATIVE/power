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
    // These logs will show the inlined env‐vars in the browser console:
    console.log("→ URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("→ KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    const supabase = supabaseClient();
    if (!supabase) {
      console.error("Supabase client not initialized");
      return;
    }

    supabase
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

    const channel = supabase
      .channel("imu_samples_channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "imu_samples" },
        ({ new: newRow }: { new: IMUSample }) => {
          const ts = new Date(newRow.timestamp).toLocaleTimeString("en-US", {
            hour12: false,
          });
          setChartData((prev) => [
            ...prev,
            { timestamp: ts, axis: "ax", value: newRow.ax },
            { timestamp: ts, axis: "ay", value: newRow.ay },
            { timestamp: ts, axis: "az", value: newRow.az },
            { timestamp: ts, axis: "gx", value: newRow.gx },
            { timestamp: ts, axis: "gy", value: newRow.gy },
            { timestamp: ts, axis: "gz", value: newRow.gz },
          ]);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
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

