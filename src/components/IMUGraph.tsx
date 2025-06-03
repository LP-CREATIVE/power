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
  const [chartData, setChartData] = useState<Array<{ timestamp: string; axis: string; value: number }>>([]);

  useEffect(() => {
     supabaseClient
      .from("imu_samples")
      .select<Pick<IMUSample, "timestamp" | "ax" | "ay" | "az" | "gx" | "gy" | "gz">>(
        "timestamp, ax, ay, az, gx, gy, gz"
      .order("timestamp", { ascending: true })
      .limit(1000)
      .then(({ data, error }) => {
        if (error) {
          console.error("Supabase fetch error:", error);
          return;
        }
        if (!data) return;

        // 2) Flatten each row into six {timestamp, axis, value} objects
        const flattened: Array<{ timestamp: string; axis: string; value: number }> = [];
        data.forEach((row) => {
          // Format the timestamp as "HH:MM:SS" (24h)
          const ts = new Date(row.timestamp).toLocaleTimeString("en-US", { hour12: false });
          flattened.push({ timestamp: ts, axis: "ax", value: row.ax });
          flattened.push({ timestamp: ts, axis: "ay", value: row.ay });
          flattened.push({ timestamp: ts, axis: "az", value: row.az });
          flattened.push({ timestamp: ts, axis: "gx", value: row.gx });
          flattened.push({ timestamp: ts, axis: "gy", value: row.gy });
          flattened.push({ timestamp: ts, axis: "gz", value: row.gz });
        });
        setChartData(flattened);
      });

    // 3) (Optional) Listen for new INSERTs in real time and append them
    const subscription = supabaseClient
      .from("imu_samples")
      .on("INSERT", ({ new: newRow }: { new: IMUSample }) => {
        const ts = new Date(newRow.timestamp).toLocaleTimeString("en-US", { hour12: false });
        setChartData((prev) => [
          ...prev,
          { timestamp: ts, axis: "ax", value: newRow.ax },
          { timestamp: ts, axis: "ay", value: newRow.ay },
          { timestamp: ts, axis: "az", value: newRow.az },
          { timestamp: ts, axis: "gx", value: newRow.gx },
          { timestamp: ts, axis: "gy", value: newRow.gy },
          { timestamp: ts, axis: "gz", value: newRow.gz },
        ]);
      })
      .subscribe();

    return () => {
      supabaseClient.removeSubscription(subscription);
    };
  }, []);

  // 4) Construct a VChart line‐chart spec, using "axis" as the seriesField
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
    // You can customize colors, legend, tooltips, etc. below:
    color: [
      "hsl(200, 70%, 40%)", // ax (e.g. blue)
      "hsl(340, 70%, 40%)", // ay (e.g. pink)
      "hsl( 60, 70%, 40%)", // az (e.g. yellow)
      "hsl(  0, 70%, 50%)", // gx (e.g. red)
      "hsl(120, 70%, 40%)", // gy (e.g. green)
      "hsl(280, 70%, 50%)", // gz (e.g. purple)
    ],
    padding: [40, 20, 20, 60], // top, right, bottom, left
    tooltip: {
      trigger: ["hover", "click"],
    },
    legend: {
      visible: true,
      position: "top",
      orient: "horizontal",
    },
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
    xAxis: {
      title: {
        visible: true,
        text: "Time (HH:MM:SS)",
      },
      // if you want to avoid overlapping labels, you can rotate:
      label: {
        // rotate: -45,
        // style: { textAlign: "end" },
      },
    },
    yAxis: {
      title: {
        visible: true,
        text: "Sensor Value",
      },
      // you can fix domain if you know range (e.g. gyro ±2000°/s)
      // domain: [-300, 300],
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
      <VChart spec={spec} />
    </div>
  );
}

