// power/src/app/log/page.tsx
"use client";

import dynamic from "next/dynamic";

// ↓ from app/log/page.tsx → ../../components/IMUGraph
const IMUGraph = dynamic(() => import("../../components/IMUGraph"), {
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
