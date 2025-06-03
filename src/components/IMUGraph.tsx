// src/components/IMUGraph.tsx
"use client";

import { useEffect, useState } from "react";
import { VChart } from "@visactor/react-vchart";
import type { ILineChartSpec } from "@visactor/vchart";
import { getSupabaseClient } from "@/lib/supabaseClient";

type IMUSample = {
  created_at: string;
  ax: number;
  ay: number;
  az: number;
  gx: number;
  gy: number;
  gz: number;
};

export default function IMUGraph() {
  const [chartData, setChartData] = useState<
    Array<{ time: string; axis: string; value: number }>
  >([]);
  // Add rawRows state and its setter
  const [rawRows, setRawRows] = useState<IMUSample[] | "loading">("loading");

  useEffect(() => {
    console.log("→ NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("→ NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    const supabase = getSupabaseClient();
    supabase
      .from("imu_samples")
      .select("created_at, ax, ay, az, gx, gy, gz")
      .order("created_at", { ascending: true })
      .limit(1000)
      .then(({ data, error }) => {
        if (error) {
          console.error("Supabase fetch error:", error);
          setRawRows([]); // set to empty array on error
          return;
        }
        if (!data) {
          setRawRows([]); // no data returned
          return;
        }

        console.log("Raw rows from Supabase:", data);
        setRawRows(data as IMUSample[]);

        const rows = data as IMUSample[];
        const flattened = rows.flatMap((row) => {
          const ts = new Date(row.created_at).toLocaleTimeString("en-US", {
            hour12: false,
          });
          return [
            { time: ts, axis: "ax", value: row.ax },
            { time: ts, axis: "ay", value: row.ay },
            { time: ts, axis: "az", value: row.az },
            { time: ts, axis: "gx", value: row.gx },
            { time: ts, axis: "gy", value: row.gy },
            { time: ts, axis: "gz", value: row.gz },
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
          const ts = new Date(newRow.created_at).toLocaleTimeString("en-US", {
            hour12: false,
          });
          setChartData((prev) => [
            ...prev,
            { time: ts, axis: "ax", value: newRow.ax },
            { time: ts, axis: "ay", value: newRow.ay },
            { time: ts, axis: "az", value: newRow.az },
            { time: ts, axis: "gx", value: newRow.gx },
            { time: ts, axis: "gy", value: newRow.gy },
            { time: ts, axis: "gz", value: newRow.gz },
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
    xField: "time",
    yField: "value",
    seriesField: "axis",
  };

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
      <h3>Raw Supabase Rows:</h3>
      <pre style={{ background: "#f0f0f0", padding: 10, maxHeight: 200, overflow: "auto" }}>
        {rawRows === "loading" ? "Loading rows…" : JSON.stringify(rawRows, null, 2)}
      </pre>
      <h3>Chart:</h3>
      <VChart spec={spec} />
    </div>
  );
}
