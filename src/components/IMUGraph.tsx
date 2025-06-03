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
    Array<{ created_at: string; axis: string; value: number }>
  >([]);

  useEffect(() => {
    // Verify env-vars in the browser console:
    console.log("→ NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("→ NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    const supabase = getSupabaseClient(); // create client in browser
    supabase
      .from("imu_samples")
      .select("created_at, ax, ay, az, gx, gy, gz")
      .order("created_at", { ascending: true })
      .limit(1000)
      .then(({ data, error }) => {
        if (error || !data) {
          console.error("Supabase fetch error:", error);
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
            { created_at: ts, axis: "ax", value: row.ax },
            { created_at: ts, axis: "ay", value: row.ay },
            { created_at: ts, axis: "az", value: row.az },
            { created_at: ts, axis: "gx", value: row.gx },
            { created_at: ts, axis: "gy", value: row.gy },
            { created_at: ts, axis: "gz", value: row.gz },
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
            { created_at: ts, axis: "ax", value: newRow.ax },
            { created_at: ts, axis: "ay", value: newRow.ay },
            { created_at: ts, axis: "az", value: newRow.az },
            { created_at: ts, axis: "gx", value: newRow.gx },
            { created_at: ts, axis: "gy", value: newRow.gy },
            { created_at: ts, axis: "gz", value: newRow.gz },
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
      {rawRows === "loading"
        ? "Loading rows…"
        : JSON.stringify(rawRows, null, 2)}
    </pre>
      <VChart spec={spec} />
    </div>
  );
}
