// components/IMUGraph.tsx
"use client"
import { useEffect, useState } from "react";
import { supabaseClient } from "../lib/supabaseClient";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// 1) Register the Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

// 2) (Optional) TypeScript interface to model your imu_samples rows
type IMUSample = {
  id: number;
  timestamp: string;
  ax: number;
  ay: number;
  az: number;
  gx: number;
  gy: number;
  gz: number;
};

export default function IMUGraph() {
  const [samples, setSamples] = useState<IMUSample[]>([]);

  useEffect(() => {
    // Fetch the latest 1000 rows from imu_samples
    supabaseClient
      .from<IMUSample>("imu_samples")
      .select("timestamp, ax, ay, az, gx, gy, gz")
      .order("timestamp", { ascending: true })
      .limit(1000)
      .then(({ data, error }) => {
        if (error) {
          console.error("Supabase fetch error:", error);
        } else if (data) {
          setSamples(data);
        }
      });

    // Optional: listen for new INSERTs in real time
    const subscription = supabaseClient
      .from("imu_samples")
      .on("INSERT", (payload) => {
        setSamples((prev) => [...prev, payload.new as IMUSample]);
      })
      .subscribe();

    return () => {
      supabaseClient.removeSubscription(subscription);
    };
  }, []);

  // 3) Build Chart.js data
  const labels = samples.map((s) =>
    new Date(s.timestamp).toLocaleTimeString("en-US", { hour12: false })
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Accel X (g)",
        data: samples.map((s) => s.ax),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.2,
      },
      {
        label: "Accel Y (g)",
        data: samples.map((s) => s.ay),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.2,
      },
      {
        label: "Accel Z (g)",
        data: samples.map((s) => s.az),
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.2,
      },
      {
        label: "Gyro X (°/s)",
        data: samples.map((s) => s.gx),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.2,
      },
      {
        label: "Gyro Y (°/s)",
        data: samples.map((s) => s.gy),
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.2,
      },
      {
        label: "Gyro Z (°/s)",
        data: samples.map((s) => s.gz),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "IMU Streams (Accel + Gyro) vs. Time",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (HH:MM:SS)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: 1000, margin: "0 auto" }}>
      <Line options={options} data={chartData} />
    </div>
  );
}
