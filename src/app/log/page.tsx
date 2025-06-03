// src/app/log/page.tsx
"use client";

import IMUGraph from "@/components/IMUGraph";

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
