// power/src/app/log/page.tsx
"use client";
import dynamic from "next/dynamic";

// Dynamically import so Chart.js only runs in the browser.
// From here (src/app/log/page.tsx) → IMUGraph is at src/app/components/IMUGraph.tsx,
// so the relative path is "../components/IMUGraph".
const IMUGraph = dynamic(() => import("../components/IMUGraph"), {
  ssr: false,
});

export default function LogPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Live IMU Dashboard</h1>
      <p>
        This chart pulls directly from your <code>imu_samples</code> table in Supabase
        (using the anon/public key).
      </p>
      <IMUGraph />
    </main>
  );
}
