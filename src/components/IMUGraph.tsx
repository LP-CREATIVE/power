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
    // 1) Fetch initial IMU rows
    supabaseClient
      .from("imu_samples")
      .select("timestamp, ax, ay, az, gx, gy, gz")
      .order("timestamp", { ascending: true })
      .limit(1000)
      .then(({ data, error }) => {
        if (error) {
          console.error("Supabase fetch error:", error);
          return;
        }
        if (!data) return;

        const rows = data as IMUSample[];
        const flattened: Array<{ timestamp: string; axis: string; value: number }> = [];

        rows.forEach((row) => {
          const ts = new Date(row.timestamp).toLocaleTimeString("en-US", {
            hour12: false,
          });

          flattened.push({ timestamp: ts, axis: "ax", value: row.ax });
          flattened.push({ timestamp: ts, axis: "ay", value: row.ay });
          flattened.push({ timestamp: ts, axis: "az", value: row.az });
          flattened.push({ timestamp: ts, axis: "gx", value: row.gx });
          flattened.push({ timestamp: ts, axis: "gy", value: row.gy });
          flattened.push({ timestamp: ts, axis: "gz", value: row.gz });
        });

        setChartData(flattened);
      });

    // 2) Subscribe to new INSERTs via v2 Realtime
    const channel = supabaseClient
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

  // 3) Build a v1‐style ILineChartSpec
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
    color: [
      "hsl(200, 70%, 40%)", // ax
      "hsl(340, 70%, 40%)", // ay
      "hsl( 60, 70%, 40%)", // az
      "hsl(  0, 70%, 50%)", // gx
      "hsl(120, 70%, 40%)", // gy
      "hsl(280, 70%, 50%)", // gz
    ],
    padding: [40, 20, 20, 60],

    // v1‐style legend (singular, not "legends")
    legend: {
      visible: true,
      orient: "horizontal",   // valid in v1
      position: "middle",     // valid values: "start" | "middle" | "end"
    },

    // v1‐style axes array
    axes: [
      {
        orient: "bottom",      // x‐axis
        title: { text: "Time (HH:MM:SS)", visible: true },
      },
      {
        orient: "left",        // y‐axis
        title: { text: "Sensor Value", visible: true },
      },
    ],

    line: {
      state: {
        hover: {
          lineWidth: 4,
        },
      },
      style: {
        smooth: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
      <VChart spec={spec} />
    </div>
  );
}
